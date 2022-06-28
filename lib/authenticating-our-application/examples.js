/**
 * How to Get:
 * API Key
 */
const { google } = require('googleapis');

const API_KEY = 'RanD0mK3Y-abcdevwefw-1234567890';

async function main() {
    const drive_response = google.drive({ version: 'v3', auth: API_KEY });
    console.log(drive_response);
}

main().catch(console.error);