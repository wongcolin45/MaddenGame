import sqlite3

import pandas as pd
from bs4 import BeautifulSoup
import requests
import os


class MaddenScraper:
    def __init__(self):
        self.players = []
        self.images = []
        self.ratings = []
        self.positions = []
        self.team_ref = []

        self.team_dict = {
            'name' : [],
            'image' : []
        }

    def get_soup(self, page):
        url = f'https://www.ea.com/games/madden-nfl/ratings?page={page}'
        response = requests.get(url)
        return BeautifulSoup(response.text, "html.parser")

    def populate_players_images(self, soup):
        images = soup.find_all('img', class_='Picture_image__7M4gK')
        image_sources = [img['src'] for img in images]
        filtered_sources = []
        for image in images:
            if 'portrait' in image['src']:
                self.players.append(image['alt'])
                self.images.append(image['src'])

    def populate_ratings_positions(self, soup):
        spans = []
        trs = soup.find_all('tr', class_='Table_row__4INyY')
        trs = trs[1:]
        for tr in trs:
            tds = tr.find_all('td')

            # Getting position
            td_pos = tds[2]
            span = td_pos.find('span', class_='Table_tag__FeM31 generated_utility20sm__KblNR generated_utility19md__EuZui')
            self.positions.append(span.text)
            # Getting team info
            td_team = tds[3]
            img = td_team.find('img', class_='Picture_image__7M4gK')
            team_name = img['alt']
            if not team_name in self.team_dict['name']:
                self.team_dict['name'].append(img['alt'])
                self.team_dict['image'].append(img['src'])
            # Getting overall rating
            td = tds[4]
            span = td.find('span', class_='Table_statCellValue__0G9QI')
            spans.append(span)
            self.team_ref.append(team_name)

        ratings = []
        for span in spans:
            if len(span.text) == 3:
                ratings.append(span.text[0:2])
            else:
                ratings.append(span.text)
        self.ratings.extend(ratings)

    def create_csv_files(self):
        for i in range(1, 21):
            soup = self.get_soup(i)
            self.populate_players_images(soup)
            self.populate_ratings_positions(soup)

        dict = {
            'player' : self.players,
            'position' : self.positions[:-90],
            'rating' : self.ratings[:-90],
            'team' : self.team_ref[:-90],
            'image' : self.images,
        }

        player_df =  pd.DataFrame(dict)
        player_df.to_csv("players.csv", index=False)

        team_df = pd.DataFrame(self.team_dict)
        team_df.to_csv('teams.csv', index=False)

class DatabaseCreator:

    def __init__(self, name):
        # Creates db if it does not already exist
        self.conn = sqlite3.connect(f'{name}.db')
        self.cursor = self.conn.cursor()
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS Teams(
            id INTEGER PRIMARY KEY,
            name TEXT,
            image TEXT
        )
        ''')
        self.cursor.execute('''
        CREATE TABLE IF NOT EXISTS Players (
            id INTEGER PRIMARY KEY,
            name TEXT,
            position TEXT,
            image TEXT,
            rating INTEGER,
            team_id INTEGER,
            FOREIGN KEY (team_id) REFERENCES Team(id)
        )
        ''')

    def populate_team_table(self, team_csv):
        df = pd.read_csv(team_csv)
        for index, row in df.iterrows():
            self.cursor.execute('''
            INSERT INTO Teams (name, image)
            VALUES (?, ?)
            ''',(row['name'], row['image']))

    def populate_player_table(self, team_csv, player_csv):
        df = pd.read_csv(player_csv)
        team_df = pd.read_csv(team_csv)

        for index, row in df.iterrows():
            team_id = team_df[team_df['name'] == row['team']].index[0] + 1
            self.cursor.execute('''
            INSERT INTO Players (name, position, image, rating, team_id)
            VALUES (?, ?, ?, ?, ?)
            ''',(row['player'], row['position'], row['image'], row['rating'], str(team_id)))
        self.conn.commit()
        self.conn.close()
    
    def populate_db(self, team_csv, player_csv):
        self.populate_team_table(team_csv)
        self.populate_player_table(team_csv, player_csv)

# Create the csv files
scraper = MaddenScraper()
scraper.create_csv_files()


#Create databases
maker = DatabaseCreator('Madden')
maker.populate_db('teams.csv', 'players.csv')

os.remove('./teams.csv')
os.remove('./players.csv')







