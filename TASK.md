# TASK.md

## 2.1 Tracks current tasks, backlog, and sub-tasks.
## 2.2 Includes: Bullet list of active work, milestones, and anything discovered mid-process.

**Note:** This file combines the tasks from the original `TASKS.md` and categorizes them.

### Active Work

-   **Milestone 0: Revamp & Refactoring Existing Codebase**
    -   [x] Audit current folder structure, remove unused files/components (completed 2025-04-26)
        - Analyzed project structure and identified redundant files
        - Removed page-compatible.jsx in favor of TypeScript implementation
        - Organized components into feature-based directories
    -   [x] Standardize naming conventions (PascalCase for components, camelCase for hooks/utilities) (completed 2025-04-26)
        - Applied PascalCase for all component files
        - Used camelCase for utility functions and hooks
    -   [x] Consolidate shared styles into a global Tailwind config or CSS module (completed 2025-04-26)
        - Created tailwind.config.js with theme customization
        - Updated globals.css to use Tailwind directives
        - Moved inline styles to Tailwind classes where appropriate
    -   [x] Replace any hard-coded values with environment variables or config files (completed 2025-04-26)
        - Created lib/config.ts to manage environment variables
        - Moved Google Sheet ID to environment variable
        - Added documentation for required environment variables
    -   [x] Ensure ESLint/Prettier are set up and run across the codebase (completed 2025-04-26)
        - Fixed TypeScript lint errors in components
        - Updated PostCSS configuration for Tailwind
    -   [x] Refactor common logic into reusable hooks or utility functions under `lib/` (completed 2025-04-26)
        - Created useNavigation hook for keyboard/touch navigation
        - Created useAutoSwipe hook for page transitions
        - Created google-sheets.ts utility for API interactions
    -   [ ] Write or update unit tests for key components and API routes
    -   [x] Verify that the dev server still runs cleanly and there are no console errors (completed 2025-04-26)
        - Fixed CSS processing issues with Tailwind
        - Ensured proper imports and dependencies

### Backlog

-   **Milestone 1: Initialize Next.js Project & Install Dependencies**
    -   [ ] Create a new Next.js app (`npx create-next-app@latest google-photos-gallery`, `cd google-photos-gallery`)
    -   [ ] Install HTTP client and styling libraries (`npm install axios swr tailwindcss postcss autoprefixer`, `npx tailwindcss init -p`)
    -   [ ] Configure Tailwind CSS (content, import in `styles/globals.css`)
    -   [ ] Establish a **mobile-first** base (responsive breakpoints, viewport meta tag)
    -   [ ] Create helper folders (`mkdir components lib pages/api`)
-   **Milestone 2: Google Cloud Setup & OAuth Credentials**
    -   [ ] Go to Google Cloud Console and **create or select** a project
    -   [ ] Enable the **Google Photos Library API**
    -   [ ] In “APIs & Services” → “Credentials”, **Create OAuth Client ID**
    -   [ ] Download the JSON credentials file and add its values to a `.env.local`
-   **Milestone 3: Implement OAuth 2.0 Flow in Next.js**
    -   [ ] Install an OAuth helper or roll your own (`npm install next-auth`)
    -   [ ] Configure NextAuth in `pages/api/auth/[...nextauth].js`
    -   [ ] Add “Sign in with Google” button on `/pages/index.js` using `useSession()`
-   **Milestone 4: Fetching Media Items from Google Photos**
    -   [ ] Create an API route `pages/api/photos.js`
    -   [ ] In a page or component, fetch via SWR
-   **Milestone 5: UI Enhancements, Mobile-Responsive & Deployment**
    -   [ ] Build a **responsive grid** for the gallery
    -   [ ] Ensure images scale and crop correctly on all viewports
    -   [ ] Add **navigation/menu** suited for mobile
    -   [ ] Integrate a **lightbox** that supports swipe gestures on touch devices
    -   [ ] Implement **infinite scroll** or “Load more” button optimized for mobile data usage
    -   [ ] Polish styling
    -   [ ] Accessibility and testing
    -   [ ] Secure and deploy
-   **Milestone 6: Download & Social Sharing Features**
    -   [ ] **Download button** on each photo card
    -   [ ] **Native Web Share API** fallback
    -   [ ] **Facebook share**
    -   [ ] **Instagram share** (via Web Share API on mobile)
    -   [ ] **Share modal component**
    -   [ ] **Accessibility & analytics**

### Milestones

-   Milestone 0: Revamp & Refactoring Existing Codebase
-   Milestone 1: Initialize Next.js Project & Install Dependencies
-   Milestone 2: Google Cloud Setup & OAuth Credentials
-   Milestone 3: Implement OAuth 2.0 Flow in Next.js
-   Milestone 4: Fetching Media Items from Google Photos
-   Milestone 5: UI Enhancements, Mobile-Responsive & Deployment
-   Milestone 6: Download & Social Sharing Features

### Discovered During Work

*(This section would be populated as development progresses and new tasks or issues are identified)*