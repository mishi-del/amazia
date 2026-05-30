# AMAZIA launch phases (from `file/live.docx` + `file/responsive.docx`)

Your React + Vite site — **not** Next.js / Shopify. Status below is for **this repo**.

---

## There are **3 launch phases**, not 14

| Name | Where in doc | What it is |
|------|----------------|------------|
| **Phase 1** | live.docx §5 | Pre-launch hardening (12 tasks) — **do before any ads** |
| **Phase 2** | live.docx §5 | First ad creative test (7 tasks) — **marketing** |
| **Phase 3** | live.docx §5 | Scale winning creatives (6 tasks) — **after data** |

**Section 9** has a **15-item** pre-launch checklist (you may have read “14” by mistake).

**responsive.docx** has **PART 0–16** (setup, CSS, hero, Shopify, stories…) — most UI parts are already in `src/index.css` + components.

---

## Phase 1 — Pre-launch (12 tasks)

| # | Task | Status | Notes |
|---|------|--------|--------|
| 1 | 404 page | ✅ Done | `src/pages/NotFound.jsx` |
| 2 | 4 policy pages | ✅ Done | `/shipping-policy`, `/refund-policy`, `/privacy-policy`, `/terms-of-service` |
| 3 | Texture / How it feels | ✅ Done | `ProductTexture.jsx` |
| 4 | How to use AM/PM | ✅ Done | `ProductHowToUse.jsx` |
| 5 | Sticky mobile CTA | ✅ Done | `StickyMobileCTA.jsx` |
| 6 | Meta Pixel on live site | ⚠️ You | Set `VITE_META_PIXEL_ID` on Vercel + redeploy |
| 7 | Meta CAPI via Shopify | ⏭ Skipped | No Shopify (per your choice) |
| 8 | Test COD checkout | ⚠️ You | When real checkout URL exists |
| 9 | WhatsApp button | ⚠️ You | Set `VITE_WHATSAPP_NUMBER` on Vercel (`923…`) |
| 10 | Submit sitemap to GSC | ⚠️ You | `https://amaziagrid.com/sitemap.xml` |
| 11 | Mobile Lighthouse ≥ 90 | ⚠️ You | DevTools → Lighthouse; lazy-load below fold added |
| 12 | Favicon | ✅ Done | `public/favicon.svg` + apple-touch link |

**Phase 1 code: ~10/12 done.** Items 6–11 need your dashboards / testing.

---

## Section 9 — 15-item gate (before ads)

| # | Item | Status |
|---|------|--------|
| 1 | 404 on-brand | ✅ |
| 2 | All 4 policies live | ✅ |
| 3 | Texture on product area | ✅ (`#product` section + `ProductTexture`) |
| 4 | AM/PM on product area | ✅ |
| 5 | Sticky mobile CTA | ✅ |
| 6 | Meta Pixel fires | ⚠️ You verify |
| 7 | WhatsApp correct | ⚠️ You verify |
| 8 | COD flow | ⚠️ You test |
| 9 | Sitemap in GSC | ⚠️ You submit |
| 10 | Favicon in tab | ✅ |
| 11 | Lighthouse mobile | ⚠️ You run |
| 12 | No repair/treat/cure claims | ✅ (legal disclaimers kept) |
| 13 | Hero problem line | ✅ |
| 14 | SSL https | ✅ (Vercel) |
| 15 | CAPI via Shopify | ⏭ Skipped |

**~11/15 done in code; 4 need you on live site.**

---

## Phase 2 — First ad test (7 tasks)

| # | Task | Status | Notes |
|---|------|--------|--------|
| 1 | Launch 3–5 Meta creatives | ⚠️ You | Use Canva / doc story sizes 1080×1920 |
| 2 | Target PK women 25–35 | ⚠️ You | Meta Ads Manager |
| 3 | Monitor CTR / ATC | ⚠️ You | Events Manager + Vercel Analytics |
| 4 | SEO `/barrier-care-serum-guide` | ✅ Done | + 9 other entity pages |
| 5 | SEO `/ceramide-benefits-skin-barrier` | ✅ Done | |
| 6 | UGC / testimonials | ✅ Done | `Testimonials.jsx` + `ReviewForm` |
| 7 | Klaviyo abandoned cart | ⏭ Skipped | No Shopify cart |

**Phase 2 code: 3/7.** Rest is ads + optional Klaviyo.

---

## Phase 3 — Scale (6 tasks)

| # | Task | Status | Notes |
|---|------|--------|--------|
| 1 | Increase ad budget 20% / 48h | ⚠️ You | After Phase 2 data |
| 2 | 4 more entity SEO pages | ✅ Done | humid climate, sulfate-free, pH, over-exfoliation |
| 3 | Related products | ✅ Done | `RelatedProducts.jsx` (links to `#bundles`) |
| 4 | Lazy-load story templates | ⏭ N/A | No Story/Reel components in React app |
| 5 | MongoDB indexes | ✅ Done | `server/lib/ensureIndexes.js` |
| 6 | A/B test hero headline | ⚠️ You | Manual deploy or Vercel experiments |

**Phase 3 code: 3/6 done.** 1 manual, 1 N/A, 1 skipped (Shopify stories).

---

## responsive.docx — 15 layout fixes

All listed fixes (breakpoints, hero scale, buttons, touch hover, container padding, etc.) are in **`src/index.css`** + **`tailwind.config.js`** + **`Hero.jsx`**.

---

## Skipped entirely (your instructions)

- Shopify Storefront, EasyCOD in Shopify, product GraphQL  
- Next.js `app/` file structure  
- Instagram Story / Reel template components (PART 12–13)  
- Klaviyo / TikTok (optional env only in `.env.production.example`)

---

## Quick “what’s left for you”

1. Vercel env: `MONGODB_URI`, `VITE_WHATSAPP_NUMBER`, `VITE_META_PIXEL_ID`, `VITE_GA4_ID`, Firebase keys  
2. Google Search Console → submit sitemap  
3. Meta Pixel Helper on https://amazia-o5n1.vercel.app  
4. Real shop URL in `src/constants/links.js` when ready  
5. Run ads only after Phase 1 checklist is green  

---

*Last updated: after completing Phase 3 entity pages + MongoDB indexes.*
