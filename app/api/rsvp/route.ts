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
    const sheets = google.sheets({
      auth,
      version: 'v4'
    });

    // Append data to the spreadsheet - using the provided spreadsheet ID
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

  } catch (error: any) {
    console.error('Error saving RSVP:', error);
    return NextResponse.json(
      { error: 'Failed to save RSVP' },
      { status: 500 }
    );
  }
}
