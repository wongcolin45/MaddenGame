
async function fetchRandomPlayer() {
    try {
        // Send a request to the backend API
        const response = await fetch('http://localhost:3000/players/random'); // Adjust if needed
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the response JSON
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export default fetchRandomPlayer;