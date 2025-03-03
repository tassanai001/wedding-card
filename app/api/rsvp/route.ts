import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Configure Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS!),
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/spreadsheets'
      ]
    });

    // Create Google Sheets client
    const sheets = google.sheets({
      auth,
      version: 'v4'
    });

    // Append data to the spreadsheet - using the provided spreadsheet ID
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: '1EjU6skKoFkTSbif7HaUwOBgk-WaDgd2dBxuhPRcVquY', // Using the provided Google Sheet ID
      range: 'A:A', // Only using column A for names
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [name] // Only saving the name
        ]
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your RSVP!'
    }, { status: 201 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error saving RSVP:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code,
      response: error.response?.data || 'No response data'
    });
    
    // Check if it's an auth error
    if (error.message?.includes('auth') || error.message?.includes('DECODER routines')) {
      console.error('Authentication error detected. Check your Google API credentials.');
      console.error('GOOGLE_CREDENTIALS exists:', !!process.env.GOOGLE_CREDENTIALS);
      
      if (error.message?.includes('DECODER routines')) {
        console.error('This is a private key format error. Make sure your credentials JSON is properly formatted.');
      }
      // Don't log the actual values for security reasons
    }

    return NextResponse.json(
      { error: 'Failed to save RSVP', details: error.message },
      { status: 500 }
    );
  }
}
