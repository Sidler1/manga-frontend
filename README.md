# Manga Hub Frontend

## Installation

To install all dependencies with npm, run the following command in the project root directory:

```bash
npm install
```

## Getting Started

1. Copy `.env.example` to `.env` and adjust the `REACT_APP_API_BASE_URL` if necessary.
2. After installing dependencies, you can start the development server with:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Building for Production

To build the app for production:

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Additional Notes

- Ensure Node.js and npm are installed on your system.
- The backend API is assumed to be running at the URL specified in `.env`. In development, the proxy in `package.json` handles requests to avoid CORS issues.
- This frontend uses React, React Router, and Axios for API requests.
- For testing: `npm test`
- If you encounter CORS errors in development, ensure the proxy is set correctly in `package.json` and that API_BASE_URL is not set to a full URL in `.env` (use the default relative path by not setting it, or set it to '/api/v1').
- For production, if the frontend and backend are hosted on different domains, configure CORS on the backend to allow the frontend origin.

```json
{
  "name": "manga-hub-frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.24.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "proxy": "http://localhost:8888"
}
```