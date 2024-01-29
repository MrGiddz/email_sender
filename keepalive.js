import cron from 'node-cron';
import axios from 'axios';

const urlsToVisit = [
  'https://email-sender-l5uy.onrender.com/',
  'https://e-commerce-server-ioqu.onrender.com',
  'https://server-argu.onrender.com'
];

// Define the cron schedule (every 10 minutes)
const cronSchedule = '*/10 * * * *';

console.log("Cron Job Scheduled");

// Set up the cron job
cron.schedule(cronSchedule, async () => {
  try {
    // Make parallel GET requests to the specified URLs using Promise.all
    const responses = await Promise.all(urlsToVisit.map(url => axios.get(url)));

    // Log each response or handle them as needed
    responses.forEach((response, index) => {
      console.log(`Visited ${urlsToVisit[index]} - Status Code: ${response.status}`);
    });
  } catch (error) {
    // Handle errors if any request fails
    console.error(`Error visiting URLs: ${error.message}`);
  }
});
