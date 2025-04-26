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

## Backlog

### Milestone 1: Landing Page Revamp & Design
- [ ] Replace current scaffolded landing page with a Pinterest-inspired hero layout
- [ ] Design hero section showing a preview masonry grid of featured media cards
- [ ] Implement call-to-action overlay on hero cards (“Explore Gallery”)
- [ ] Apply Tailwind for:
  - Full-width background image or gradient
  - 2xl rounded corners & soft shadows on cards
  - Smooth hover transitions
- [ ] Ensure mobile-first responsiveness (collapsing nav, stacked hero cards)
- [ ] Wire up “Explore Gallery” to route into the authenticated gallery page

### Milestone 2: Google Cloud & OAuth Credentials
- [ ] Create or select a Google Cloud project
- [ ] Enable **Google Photos Library API**
- [ ] Generate OAuth 2.0 Client ID & Secret
- [ ] Add credentials to `.env` (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`)

### Milestone 3: Media Retrieval & Caching
- [ ] Implement `/pages/api/photos.ts` to call Google Photos API
- [ ] Write a `usePhotos` hook (SWR) with pagination/infinite-scroll support

### Milestone 4: Pinterest-Style Gallery Layout
- [ ] Install and configure a masonry library (e.g. `react-masonry-css`)
- [ ] Create `<MasonryGrid>` and `<MediaCard>` components
- [ ] Apply Tailwind styling for:
  - Variable-height cards
  - Rounded corners (2xl) & soft shadows
  - Hover overlay with title + “View” button
- [ ] Ensure a fully responsive, mobile-first grid

### Milestone 5: Full-Screen Preview & Actions
- [ ] Build `<MediaModal>` to show image/video full-screen
- [ ] Display title, description, and metadata (EXIF)
- [ ] Add **Download** button (preserving original filename/quality)
- [ ] Add **Share** buttons:
  - Facebook
  - Twitter (X)
  - Web Share API fallback for mobile

### Milestone 6: Performance, Testing & QA
- [ ] Use Next.js `<Image>` for optimized loading + lazy placeholders
- [ ] Audit bundle size; split heavy components with `next/dynamic`
---