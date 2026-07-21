# Industrial Cigar Co. — Buyer Site

Password-gated buyer pitch site. Static pages served by a tiny Express
server with HTTP basic auth in front of everything.

## Deploy to Railway (fastest path)

1. Create a new GitHub repo and push this folder to it (or use Railway's
   "Deploy from local directory" via the CLI — see below).
2. In Railway: New Project → Deploy from GitHub repo → select this repo.
   Railway auto-detects Node and runs `npm start`.
3. In the Railway project's Variables tab, set:
   - `BUYER_USER` — the username you want buyers to enter
   - `BUYER_PASS` — the password you want buyers to enter
   (If you skip this, it falls back to icc-buyer / change-me-before-launch —
   do not go live without setting real values.)
4. Railway gives you a live URL (yourapp.up.railway.app). Add a custom
   domain under Settings → Domains if you want something like
   data.industrialcigars.com instead.

## Or deploy straight from your machine with the Railway CLI

```
npm install -g @railway/cli
railway login
cd icc-site-app
railway init
railway up
railway variables set BUYER_USER=your-username BUYER_PASS=your-password
```

## Local test before deploying

```
cd icc-site-app
npm install
BUYER_USER=test BUYER_PASS=test123 npm start
```

Visit http://localhost:3000 — your browser will prompt for the
username/password you set.

## Notes

- Every visitor gets the same shared username/password (basic auth,
  browser-native login prompt — no custom login page to maintain).
  Good enough for a single buyer or a small trusted group; if you
  later want per-buyer accounts or revocable access, that's a bigger
  build (real auth + a database) worth doing only if this becomes a
  multi-buyer process.
- To rotate credentials at any time, just update the Railway
  environment variables — no redeploy needed, the app reads them on
  each restart.
