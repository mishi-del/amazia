# Deploy AMAZIA (live on the internet)

Two parts: **website** (Vercel) + **API** (Render). Firebase + MongoDB Atlas you already have.

---

## Part A — Deploy API (Render) — do this FIRST

1. Push code to GitHub (see bottom) OR use [Render Dashboard](https://dashboard.render.com/) → New → Web Service → connect repo.

2. Settings:
   - **Build command:** `npm install`
   - **Start command:** `node server/index.js`
   - **Health check path:** `/api/health`

3. Environment variables (Render → Environment):

| Key | Value |
|-----|--------|
| `MONGODB_URI` | Your Atlas connection string (from `.env`) |
| `CORS_ORIGIN` | Your Vercel URL (add after Part B), e.g. `https://amazia-xxx.vercel.app` |
| `FRONTEND_URL` | Same as CORS_ORIGIN |
| `API_PUBLIC_URL` | Your Render URL, e.g. `https://amazia-api.onrender.com` |
| `PORT` | `10000` (Render sets this automatically; optional) |

4. Deploy → copy your API URL, e.g. `https://amazia-api.onrender.com`

5. Test: open `https://amazia-api.onrender.com/api/health` → should show `"ok": true`

---

## Part B — Deploy website (Vercel)

1. [vercel.com](https://vercel.com) → sign in with GitHub

2. **Add New Project** → import your `amazia` GitHub repo

3. Framework: **Vite** (auto-detected)

4. Environment variables (Vercel → Settings → Environment Variables):

Copy from your local `.env` — all `VITE_FIREBASE_*` keys, plus:

| Key | Value |
|-----|--------|
| `VITE_API_URL` | `https://amazia-api.onrender.com` (your Render URL from Part A) |
| `VITE_SITE_URL` | Your Vercel URL after first deploy |

5. Deploy → copy your site URL, e.g. `https://amazia-xxx.vercel.app`

6. Go back to **Render** → update `CORS_ORIGIN` and `FRONTEND_URL` to your Vercel URL → redeploy API

---

## Part C — Firebase (required for live login)

Firebase Console → **Authentication** → **Settings** → **Authorized domains** → Add:

- `amazia-xxx.vercel.app` (your Vercel domain)
- `amazia.pk` (when you connect custom domain)

Google sign-in → ensure support email is set (you did this).

---

## Part D — MongoDB Atlas

**Network Access** → allow `0.0.0.0/0` (or Render’s IPs) so the API on Render can connect.

---

## Quick deploy with CLI (optional)

```bash
# From project folder
npm install -g vercel
vercel login
vercel --prod

# Render: connect GitHub repo in dashboard (easiest)
```

---

## Custom domain (amazia.pk)

1. Vercel → Project → Domains → add `amazia.pk`
2. Update DNS at your registrar (Vercel shows records)
3. Update Firebase authorized domains + Render `CORS_ORIGIN` / `FRONTEND_URL`

---

## Checklist

- [ ] API health URL works
- [ ] Site loads on Vercel
- [ ] Sign up → Gmail verification link opens **your Vercel URL**
- [ ] Google sign-in works
- [ ] Reviews / newsletter save to Atlas
