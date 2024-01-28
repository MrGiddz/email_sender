const cron = require('node-cron');
const axios = require('axios');

const urlToVisit = 'https://email-sender-l5uy.onrender.com/';

// Define the cron schedule (every 10 minutes)
const cronSchedule = '*/10 * * * *';

// Set up the cron job
cron.schedule(cronSchedule, async () => {
  try {
    // Make a GET request to the specified URL
    const response = await axios.get(urlToVisit);

    // Log the response or any other handling logic you need
    console.log(`Visited ${urlToVisit} - Status Code: ${response.status}`);
  } catch (error) {
    // Handle errors if the request fails
    console.error(`Error visiting ${urlToVisit}: ${error.message}`);
  }
});