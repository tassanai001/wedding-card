# Wedding Card Project Overview

Based on my exploration of the project, here's a comprehensive overview of the wedding card application:

## Project Structure

```
wedding-card/
├── app/
│   ├── api/
│   │   └── rsvp/
│   │       └── route.ts        # RSVP API endpoint
│   ├── components/
│   │   └── DevToolsRsvp.tsx    # RSVP component
│   ├── favicon.ico
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # App layout
│   ├── page-compatible.jsx     # Alternative page implementation
│   └── page.tsx                # Main application page
├── public/                     # Static assets
├── .env                        # Environment variables
├── .next/                      # Next.js build output
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies
└── tsconfig.json               # TypeScript configuration
```

## High-Level Vision

This is a digital wedding invitation/card application for "Num & Art" (Parichat Hongon & Tassanai Yeeton) for their wedding on March 15, 2025. The application serves as an interactive digital invitation that guests can view on their devices, with RSVP functionality that integrates with Google Sheets.

## Architecture

- **Frontend:** Next.js application with React components
- **Backend:** Next.js API routes for handling RSVP submissions
- **Data Storage:** Google Sheets API for storing RSVP responses
- **Authentication:** Google Auth for API access to Google Sheets

## Tech Stack

- **Framework:** Next.js 15.2.0 (App Router)
- **Frontend:**
  - React 19.0.0
  - TypeScript
  - CSS (with global styles)
- **Backend:**
  - Next.js API Routes
  - Google APIs (googleapis package)
- **Styling:** Appears to use custom CSS (no explicit CSS framework in dependencies, though there's a TailwindCSS reference in devDependencies)

## Key Features

- Interactive Wedding Invitation: Multi-page digital card with animations
- Auto-swiping Pages: Automatically transitions between pages every 10 seconds
- Touch Navigation: Supports swipe gestures for mobile devices
- Keyboard Navigation: Supports arrow keys for desktop navigation
- Background Video: Decorative video background with flower theme
- RSVP System: Allows guests to submit their attendance confirmation
- Google Sheets Integration: Stores RSVP responses in a Google Spreadsheet

## Tools & Integrations

- Google Sheets API: For storing RSVP responses
- Google Auth: For authenticating with Google APIs
- Environment Variables: For storing API credentials securely

## Constraints

- The application requires Google API credentials (client email and private key) to function properly
- The RSVP system is currently designed to only collect names (minimal data collection)
- The application is designed for both mobile and desktop viewing

## Development Tools

- Package Manager: npm (based on package-lock.json presence)
- Linting: ESLint with Next.js configuration
- TypeScript: For type safety
- Development Server: Next.js dev server

The project is a modern, interactive digital wedding invitation built with Next.js and React, featuring a clean design with floral elements, interactive navigation, and a simple RSVP system that integrates with Google Sheets for data collection.