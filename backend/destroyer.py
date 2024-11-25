import os
#Removed unused csv

paths = ['./teams.csv', './players.csv', './Madden.db']

for path in paths:
    if os.path.exists(path):
        os.remove(path)


