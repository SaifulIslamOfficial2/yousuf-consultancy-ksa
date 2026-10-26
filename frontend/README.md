# Yousuf Consultancy — Frontend

React + Vite + Tailwind frontend for Yousuf Consultancy website.

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173` — admin at `/admin/login`.

## Configuration

No backend is needed: leave `VITE_BACKEND_URL` empty and the admin panel uses the
in-browser database (`src/api/localApi.js`). Set `VITE_BACKEND_URL=https://your-backend.com`
later to switch to a real backend.

## Vercel Deploy

1. Push this folder to its own GitHub repo
2. Import the repo on <https://vercel.com/new>
3. Vercel auto-detects Vite — leave settings as-is
4. **Add environment variable** in Project Settings:
   - `VITE_BACKEND_URL` = your backend's production URL (e.g. `https://yousuf-backend.onrender.com`)
5. Deploy

## Admin Panel

Available at `/admin/login` (runs in-browser, no backend needed).

Default credentials:
```
Email:    yousufconsultancy46@gmail.com
Password: 0571446@#
```

## Structure

```
.
├── public/                  # static assets
├── src/
│   ├── api/client.js        # axios → in-browser local API (or ${VITE_BACKEND_URL}/api/*)
│   ├── context/AuthContext.jsx
│   ├── hooks/useAuth.js
│   ├── i18n/                # English + Bangla translations
│   ├── component/
│   │   ├── navbar/
│   │   ├── footer/
│   │   ├── pages/           # public pages
│   │   ├── admin/           # admin panel
│   │   └── ...
│   ├── router/ProtectedRoute.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
├── vercel.json
└── .env.example
```
