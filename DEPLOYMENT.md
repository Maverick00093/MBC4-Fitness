# Deployment Guide

This project is prepared for deployment with the frontend on **Vercel** and the backend on **Railway**.

## 1. Backend Deployment (Railway)

1.  **Create a Railway Project**: Push your code to GitHub and connect the `server` directory to a new Railway service.
2.  **Environment Variables**: In Railway, go to the **Variables** tab and add the following:
    *   `PORT`: `5000` (Railway usually provides this automatically)
    *   `CLIENT_URL`: `https://your-frontend-domain.vercel.app` (Your Vercel URL)
    *   `EMAIL_HOST`: Your SMTP host (e.g., `smtp.gmail.com`)
    *   `EMAIL_PORT`: `587`
    *   `EMAIL_USER`: Your email address
    *   `EMAIL_PASS`: Your email app password
    *   `EMAIL_FROM`: `MBC4 Fitness <your-email@gmail.com>`
    *   `EMAIL_TO`: `recipient@example.com`

## 2. Frontend Deployment (Vercel)

1.  **Create a Vercel Project**: Import your GitHub repository.
2.  **Root Directory**: Set the root directory to `client`.
3.  **Build Settings**: Vercel should auto-detect Vite. Ensure:
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
4.  **Environment Variables**: Add the following in Vercel settings:
    *   `VITE_API_URL`: `https://your-backend-url.railway.app` (The URL provided by Railway)

## Important Notes

- **CORS**: The backend is configured to allow requests from your `CLIENT_URL`. Make sure this matches exactly.
- **SPA Routing**: The `client/vercel.json` file handles routing, so page refreshes on sub-routes (like `/contact`) will work correctly.
- **API Calls**: The frontend uses `import.meta.env.VITE_API_URL` to determine the backend location. If this is not set, it defaults to an empty string (using the Vite proxy, which is for local development only).
