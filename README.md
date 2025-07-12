# Manga Hub Frontend

A modern, user-centric React-based frontend for Manga Hub, designed to provide a single hub for tracking manga updates
across websites. Emphasizes intuitive UI/UX with responsive design, easy navigation, and features like notifications,
bookmarks, and tag-based search.

## Table of Contents

- [Features](#features)
- [UI/UX Design Principles](#uiux-design-principles)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Building for Production](#building-for-production)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [Key Dependencies](#key-dependencies)
- [Backend Integration](#backend-integration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Centralized Update Tracking**: View updates for favorite mangas from multiple websites in one place.
- **Tag-Based Search**: Filter mangas by tags for personalized discovery.
- **Notifications**: Real-time alerts for new chapter updates.
- **Bookmarks**: Remember the last read chapter for each manga.
- **External Links**: Direct links to original websites with a notice encouraging support for creators.
- **Estimated Release Times**: Display predicted next chapter times based on backend calculations.

## UI/UX Design Principles

- **Modern & Minimalist**: Clean interface using Material-UI or Tailwind CSS for a sleek, manga-inspired aesthetic (
  e.g., card-based layouts for manga lists).
- **Responsive Design**: Fully mobile-friendly with adaptive layouts for desktops, tablets, and phones.
- **User-Friendly Navigation**: Intuitive sidebar for favorites, search bar with autocomplete for tags, and modal
  notifications.
- **Accessibility**: ARIA labels, high contrast modes, and keyboard navigation support.
- **Performance**: Lazy loading for images and chapters to ensure fast load times.

## Installation

1. Clone the repository:

```
git clone https://github.com/Sidler1/manga-frontend.git
```

2. Navigate to the project directory:

```

cd manga-frontend

```

3. Install dependencies:

```

npm install

```

## Getting Started

1. Copy the example environment file:

```

cp .env.example .env

```

2. Update `.env` with your backend API URL (e.g., `REACT_APP_API_BASE_URL=http://localhost:8080`).
3. Start the development server:

```

npm start

```

The app will run at `http://localhost:3000`.

Note: In development, a proxy is set up in `package.json` to handle CORS issues with the backend.

## Building for Production

Run:

```

npm run build

```

This creates an optimized build in the `build` folder, ready for deployment (e.g., to Netlify or Vercel).

## Testing

Launch tests with:

```

npm test

```

Uses Jest and React Testing Library for unit and integration tests.

## Environment Variables

- `REACT_APP_API_BASE_URL`: Base URL for the backend API.
- Add more as needed for features like notifications (e.g., WebSocket endpoints).

## Key Dependencies

- React & React Router: For component-based UI and routing.
- Axios: For API requests to backend routes.
- Material-UI or similar: For styled components and responsive grids.
- Redux or Context API: For state management (e.g., user bookmarks and notifications).

See `package.json` for the full list.

## Backend Integration

This frontend integrates with the Manga Hub Backend (https://github.com/Sidler1/manga-backend). Key routes include:

- `/mangas`: Fetch all mangas with updates.
- `/websites`: Add scraping sources.
- `/tags`: Search and filter by tags.
- Handle pagination, authentication (e.g., JWT), and error states gracefully in the UI.
- For real-time updates (e.g., notifications), consider WebSockets if implemented in backend.

If backend routes are unclear, clarify their functionality (e.g., what does `/chapters` return?).

## Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/new-ui-component`.
3. Commit changes: `git commit -m 'Add new manga card component'`.
4. Push: `git push origin feature/new-ui-component`.
5. Open a pull request.

Focus contributions to enhancing UI/UX, such as adding dark mode or improving bookmark visuals.

## License

MIT License. See LICENSE file for details.