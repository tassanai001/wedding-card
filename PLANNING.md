# PLANNING.md

## 1.1 High-Level Vision

The project is a digital wedding invitation application designed for Num & Art's wedding on March 15, 2025. It aims to provide an interactive and engaging experience for guests, replacing traditional paper invitations with a dynamic digital format. The core feature is an RSVP system integrated with Google Sheets for efficient guest management.  Additionally, the project in `TASK.md` is a Google Photos gallery, which is separate from the wedding invitation project.

## Architecture

### Wedding Invitation Project

-   **Frontend:** Next.js (React) application, leveraging the App Router for modern routing and component structure.
-   **Backend:** Next.js API routes, providing server-side functionality for handling RSVP submissions.
-   **Data Storage:** Google Sheets, utilizing the Google Sheets API to persist RSVP data.
-   **Communication:** HTTP for client-server communication, Google APIs for Sheets interaction.

### Google Photos Gallery Project

-   **Frontend:** Next.js (React) application
-   **Backend:** Next.js API routes for fetching data from Google Photos.
-   **Data Storage:** Google Photos
-   **Authentication:** OAuth 2.0 (NextAuth with Google Provider)
-   **Communication:** Google Photos Library API

## Constraints

### Wedding Invitation Project

-   **Dependency on Google APIs:** Requires valid Google API credentials (client email, private key) to interact with Google Sheets.
-   **Data Privacy:** Current RSVP system collects only names, but future iterations may need to consider broader data privacy implications if more data is collected.
-   **Deployment:** Needs a hosting environment suitable for Next.js applications, with secure handling of environment variables.
-   **Date Specificity:** The application is inherently tied to a specific event date (March 15, 2025).

### Google Photos Gallery Project

-   **Authentication Complexity:** OAuth 2.0 flow adds complexity to the application.
-   **API Rate Limits:** Google Photos API may have rate limits that need to be handled.
-   **Data Usage:** Fetching large numbers of photos can impact performance and data usage, especially on mobile.
-   **Security:** Securely handling and storing OAuth credentials is crucial.

## Tech Stack

### Wedding Invitation Project

-   Next.js (React)
-   TypeScript
-   CSS
-   Google APIs (googleapis package)

### Google Photos Gallery Project

-   Next.js (React)
-   TypeScript
-   Tailwind CSS
-   NextAuth
-   Google Photos Library API
-   axios
-   SWR

## Tools

### Wedding Invitation Project

-   npm
-   ESLint
-   (Potentially Prettier, inferred from dev dependencies)
-   Next.js Dev Server
-   VS Code (inferred)

### Google Photos Gallery Project

-   npm
-   ESLint
-   Prettier
-   Chrome DevTools
-   Vercel (for deployment)
-   Git/GitHub (inferred for version control)