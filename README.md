# README.md

## Wedding Card Application

This application is a digital wedding invitation for Num & Art (Parichat Hongon & Tassanai Yeeton), designed to provide an interactive experience for guests for their wedding on March 15, 2025.

## Features

- Interactive multi-page invitation with animations
- Automatic page swiping (10-second intervals)
- Touch and keyboard navigation for accessibility
- Decorative floral-themed background video
- RSVP functionality with Google Sheets integration
- Mobile-first responsive design

## Tech Stack

- **Frontend:** Next.js 15.2.0, React 19.0.0
- **Language:** TypeScript
- **Styling:** Custom CSS with Tailwind CSS
- **APIs:** Google Sheets API for RSVP storage
- **Dependencies:** googleapis

## Project Structure

```
wedding-card/
├── app/
│   ├── api/
│   │   └── rsvp/         # API endpoint for RSVP submissions
│   ├── components/
│   │   ├── rsvp/         # RSVP-related components
│   │   └── ui/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and configuration
│   │   └── utils/        # Utility functions
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # App layout
│   └── page.tsx          # Main application page
└── public/               # Static assets
```

## Setup

1. Ensure you have Node.js (v18+) and npm installed.
2. Clone the repository.
3. Install dependencies:
   ```
   npm install
   ```
4. Set up Google API credentials:
   - Create a Google Cloud project
   - Enable the Google Sheets API
   - Create a service account and download the credentials
   - Create a Google Sheet and share it with the service account email
   - Note the Google Sheet ID from the URL

5. Create a `.env` file in the root directory with the following variables:
   ```
   GOOGLE_CLIENT_EMAIL=your-service-account-email@example.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEET_ID=your-google-sheet-id
   ```

6. Run the development server:
   ```
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- The wedding invitation automatically transitions between pages every 10 seconds.
- Users can navigate using:
  - Swipe gestures on touch devices
  - Arrow keys on desktop
  - Indicator dots at the bottom of the screen
- The RSVP button in the bottom right corner opens a form for guests to submit their names.

## Deployment

The application can be deployed to Vercel or any other hosting platform that supports Next.js applications:

1. Push your code to a Git repository.
2. Connect your repository to Vercel.
3. Add the environment variables in the Vercel dashboard.
4. Deploy the application.

## Changelog

### April 26, 2025
- Refactored codebase for better organization and maintainability
- Extracted reusable components and custom hooks
- Added proper TypeScript typing
- Implemented Tailwind CSS integration
- Created configuration file for environment variables
- Improved documentation

---

## Google Photos Gallery

This Next.js application displays a photo gallery fetched from Google Photos.

### Features

- OAuth 2.0 authentication with Google
- Fetching and displaying media items from Google Photos
- Responsive grid layout
- Download and social sharing options (in progress)

### Tech Stack

- Next.js (React)
- TypeScript
- Tailwind CSS
- NextAuth
- Google Photos Library API
- axios
- SWR

### Setup

1. Ensure you have Node.js and npm installed.
2. Clone the repository.
3. Install dependencies: `npm install`
4. Set up Google Cloud credentials for the Google Photos Library API and NextAuth. Add the credentials to `.env.local`.
5. Run the development server: `npm run dev`

### Deployment

The application can be deployed to Vercel or any other hosting platform that supports Next.js applications.