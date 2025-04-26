/**
 * Utility functions for Google Sheets API integration
 */
import { google } from 'googleapis';

/**
 * Initialize Google Sheets API client with authentication
 * @returns Authenticated Google Sheets API client
 */
export const initGoogleSheetsClient = () => {
  // Configure Google Auth
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    },
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/spreadsheets'
    ]
  });

  // Create Google Sheets client
  return google.sheets({
    auth,
    version: 'v4'
  });
};

/**
 * Append a row to the RSVP spreadsheet
 * @param name Name of the person RSVPing
 * @returns Response from Google Sheets API
 */
export const appendRsvpToSheet = async (name: string) => {
  const sheets = initGoogleSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  
  if (!spreadsheetId) {
    throw new Error('Google Sheet ID is not defined in environment variables');
  }

  return await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'A:A', // Only using column A for names
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        [name, new Date().toISOString()] // Save name and timestamp
      ]
    }
  });
};
