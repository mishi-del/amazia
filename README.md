# AMAZIA Landing Page



React + Vite skincare landing page for Barrier Support Serum.



## Run locally



```bash

npm install

cp .env.example .env

# Edit .env — at minimum set MONGODB_URI and JWT_SECRET

npm run dev:all

```



- Site: http://localhost:5173  

- API: http://localhost:3001 (Vite proxies `/api/*` in dev)



Or run separately: `npm run dev` and `npm run dev:api`.



## Features



- **Accounts** — sign up, sign in, forgot password (email link), Continue with Google

- **MongoDB** — users, reviews, newsletter signups stored in your database

- **AMAZIA Guide** — free chatbot on the page (built-in answers from your FAQ and product copy — no paid API)

- Reviews and newsletter forms (no Formspree)



## Configure `.env`



| Variable | Required | Purpose |

|----------|----------|---------|

| `MONGODB_URI` | Yes | MongoDB connection string |

| `JWT_SECRET` | Yes | Auth tokens |

| `FRONTEND_URL` | Yes | Password reset links + Google redirect |

| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | For Google login | OAuth in [Google Cloud Console](https://console.cloud.google.com/) — redirect URI: `http://localhost:3001/api/auth/google/callback` |

| `SMTP_*` | For email reset in production | Without SMTP, reset links print in the API terminal |




## Images



```

public/assets/

```



| Save as | Priority |

|---------|----------|

| `hero-serum.png` | **Must have** |

| `product-main.png` | **Must have** |

| `lifestyle.png` | **Must have** |

| `before-after.jpg` | Optional |



## Other config



Edit `src/constants/links.js`:



- `WHATSAPP_URL` — your WhatsApp number  

- `SHOP_URL` — your checkout link when ready  



## Build for hosting



```bash

npm run build

```



Upload `dist` for the frontend. Deploy `server/` for the API. Set `VITE_API_URL` when building the site.

