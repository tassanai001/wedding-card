/**
 * Configuration file for environment variables
 * 
 * This file documents the required environment variables for the wedding card application.
 * Create a .env file in the root directory with the following variables:
 * 
 * GOOGLE_CLIENT_EMAIL=your-service-account-email@example.iam.gserviceaccount.com
 * GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
 * GOOGLE_SHEET_ID=your-google-sheet-id
 */

// Google Sheets API configuration
export const googleConfig = {
  clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  privateKey: process.env.GOOGLE_PRIVATE_KEY,
  sheetId: process.env.GOOGLE_SHEET_ID
};

// Validate required environment variables
export const validateEnvVars = (): boolean => {
  const requiredVars = ['GOOGLE_CLIENT_EMAIL', 'GOOGLE_PRIVATE_KEY', 'GOOGLE_SHEET_ID'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    return false;
  }
  
  return true;
};
