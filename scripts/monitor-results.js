/**
 * Result Announcement Monitoring Script
 * Use this script on result days to detect when JNTUH updates its results portal.
 */

const axios = require('axios');
const nodemailer = require('nodemailer');

const PORTAL_URL = 'https://jntuhresults.theskypedia.com/'; // Or official JNTUH URL
const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

let lastContent = '';

async function checkResults() {
    try {
        console.log(`Checking results at ${new Date().toLocaleTimeString()}...`);
        const response = await axios.get(PORTAL_URL);
        const currentContent = response.data;

        if (lastContent && currentContent !== lastContent) {
            console.log('!!! CHANGE DETECTED !!!');
            await sendNotification('JNTUH Results Might be Out!', 'The portal content has changed. Check immediately.');
        }

        lastContent = currentContent;
    } catch (error) {
        console.error('Error checking results:', error.message);
    }
}

async function sendNotification(subject, text) {
    // Configure your email/telegram/whatsapp notification logic here
    console.log(`NOTIFICATION: ${subject} - ${text}`);
    // Example: WhatsApp API or Telegram Bot
}

console.log('Starting Result Monitor...');
setInterval(checkResults, CHECK_INTERVAL);
checkResults();
