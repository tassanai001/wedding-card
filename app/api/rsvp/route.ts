import { NextResponse } from 'next/server';
import { appendRsvpToSheet } from '../../lib/utils/google-sheets';

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

    // Use the utility function to append to the sheet
    await appendRsvpToSheet(name);

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
    if (error.message?.includes('auth')) {
      console.error('Authentication error detected. Check your Google API credentials.');
      console.error('GOOGLE_CLIENT_EMAIL exists:', !!process.env.GOOGLE_CLIENT_EMAIL);
      console.error('GOOGLE_PRIVATE_KEY exists:', !!process.env.GOOGLE_PRIVATE_KEY);
      console.error('GOOGLE_SHEET_ID exists:', !!process.env.GOOGLE_SHEET_ID);
      // Don't log the actual values for security reasons
    }

    return NextResponse.json(
      { error: 'Failed to save RSVP', details: error.message },
      { status: 500 }
    );
  }
}
