# Yousuf Consultancy

Frontend-only React + Vite website **with the admin panel included**.
There is no backend right now — the admin panel runs entirely in the browser.

```
yousuf-consultancy/
└── frontend/      # React + Vite  →  deploy to Vercel
```

## Run

```bash
cd frontend
npm install
npm run dev
```

- Site: `http://localhost:5173`
- Admin: `http://localhost:5173/admin/login`
- Default login: `yousufconsultancy46@gmail.com` / `0571446@#`
  (override with `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD` in `.env`)

## How the "no backend" mode works

- `src/api/localApi.js` re-implements every old `/api/*` route (auth, team, services,
  blog, umrah, gallery, applications, sub-admins, dashboard, analytics).
- `src/api/localDb.js` stores the data in the browser's IndexedDB.
- `src/api/client.js` routes all `api.get/post/put/delete` calls to that local API
  while `VITE_BACKEND_URL` is empty. Images are compressed and stored inside the DB.

**Limitation:** data lives in *one browser only*. Content added from the admin panel is
not visible to other visitors/devices, and clearing site data wipes it.

## Adding the backend later

1. Set `VITE_BACKEND_URL=https://your-backend` (in `.env` / Vercel env vars).
   `client.js` then skips the local adapter automatically and uses real HTTP.
2. Your backend must expose the same routes/response shapes as `localApi.js`.
3. Delete `src/api/localApi.js` and `src/api/localDb.js` once you no longer need them.

## Europe Work Visa & Work Permit

- Content/config: `frontend/src/data/europeWorkVisa.js` (process steps, documents, FAQs, sources).
- Fee / timeline / service type / visibility are editable in Admin → "ইউরোপ ওয়ার্ক ভিসা" (`/api/europe-visa`).
- Routes: `/europe-work-visa`, `/europe-work-visa/{poland|serbia|germany|lithuania}` (`/umrah` redirects here).
- Inquiry form posts to `/api/applications` (Admin → Applications) and sends an EmailJS notification.
