# 💵 ZeroToEarn — a monetization-ready blog you can run for $0

A complete content blog built with plain HTML/CSS/JS — no build tools, no dependencies, no hosting fees.
It's structured specifically to pass **Google AdSense approval** and to monetize with **ads + affiliate links**,
the two proven models that require zero upfront investment.

```
├── index.html                       Homepage (hero, search, category filter, featured post)
├── about.html        ┐              AdSense-required pages
├── contact.html      ├  (Google's reviewers check for these — keep them!)
├── privacy-policy.html┘             Includes AdSense/affiliate/disclosure clauses
├── posts/                           30 full SEO-ready articles (your starting content)
├── css/styles.css                   Whole design — edit variables to re-theme in minutes
├── js/main.js                       Dark mode, search, forms, cookie banner, share buttons
├── ads.txt                          Placeholder for AdSense's ads.txt line
├── robots.txt / sitemap.xml         SEO basics (swap YOUR-DOMAIN.com)
├── favicon.svg
└── README.md                        ← you are here
```

> **Cost to run: $0.** Hosting is free, the domain can stay free (you get a free subdomain), fonts load
> from Google's free CDN, and the design uses CSS gradients instead of stock images — nothing to pay for.

---

## 1. Preview it locally

Just open `index.html` in any browser. Or, for a local web server (nicer URLs):

```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

## 2. Publish it free (pick one — all free, ~5 minutes)

| Host | How | You get |
|---|---|---|
| **Netlify Drop** (easiest) | Zip this folder → drag into <https://app.netlify.com/drop> | Instant live URL, free SSL, custom domain later |
| **GitHub Pages** | Push files to a repo → Settings → Pages → deploy from branch | `yourname.github.io` |
| **Cloudflare Pages** | Connect a repo or upload | Fast global CDN |

**Before publishing, do a find & replace across all files:**
`YOUR-DOMAIN.com` → your real domain (or your free `yoursite.netlify.app` subdomain).

## 3. The money roadmap (realistic, in order)

### Step 1 — Grow the content (weeks 1–6)
AdSense rarely approves sites under ~20–30 quality posts. You start with **30 full articles**;
write 2–3 more per week using `posts/start-blog-free.html` as your playbook (the "pillar + spoke"
structure is explained there). Use the same file as a template — copy it, edit the content,
update the JSON-LD schema and meta tags.

### Step 2 — Apply to Google AdSense
Requirements checklist (your site already satisfies the technical ones):

- [x] About, Contact, Privacy Policy pages (`privacy-policy.html` mentions third-party advertising)
- [x] `ads.txt` file at the root (replace the placeholder after approval)
- [x] Cookie consent banner (required to serve ads in the EEA/UK)
- [x] Clean navigation, fast static pages, mobile responsive
- [x] 30 original articles ← **this is the part you build**
- [ ] A custom domain strongly preferred (Blogger's `.blogspot.com` is the exception Google allows)

Then, in every HTML file, search for **`ADSENSE SLOT`** — each marks exactly where to paste code:

1. **Site verification script** → paste in the `<head>` where the comment is (all pages).
2. **After approval** → create ad units in AdSense and replace the visible placeholder boxes
   (`<aside class="ad-slot">`) with your ad unit code. Slots exist for: header, in-article (×2 per post),
   sidebar, and homepage leaderboard.
3. **ads.txt** → uncomment the line and put in your `pub-XXXXXXXXXXXXXXXX` ID.

> ⚠️ Never click your own ads. It's the fastest way to lose the account.

### Step 3 — Add affiliate links (do this from day 1, no approval needed)
Search the files for **`affiliate link`** — every placeholder is marked, e.g.:

```html
<a href="#" rel="nofollow sponsored">Canva Free (replace with your affiliate link)</a>
```

Good free programs to join: **Amazon Associates**, **ShareASale**, **Impact**, **PartnerStack**,
plus individual SaaS programs (hosting, VPNs, Canva alternatives — many pay 20–30% *recurring*).
Always keep `rel="nofollow sponsored"` on affiliate links (Google + FTC require it).

### Step 4 — Connect your forms (free)
The newsletter and contact forms currently show a local success message for testing.
To collect real emails/messages:

1. Create a free account at [Formspree](https://formspree.io) (or Getform).
2. Replace each form's `action="#"` with your Formspree URL.
3. In `js/main.js`, the `data-fake-submit` handler already handles the success message —
   or let Formspree handle submission by removing that attribute once the endpoint works.

## 4. Make it yours

- **Name/logo:** find & replace `ZeroToEarn` across the files.
- **Author:** replace "Alex Rivera" and the bio in `about.html` + author boxes in posts.
- **Colors/theme:** everything lives in the `:root` block at the top of `css/styles.css`
  (`--accent` is the green — one change re-themes the whole site).
- **Niche:** the demo niche is "earn money online" (a high-CPC niche). If you'd rather cover
  gardening, cooking or fitness, keep the layout and swap article content — but read
  `posts/highest-paying-adsense-niches.html` first: choosing a *commercial* niche multiplies RPM.

## 5. Free promotion stack

1. **Google Search Console** (free) — submit `sitemap.xml`, track queries.
2. **Pinterest** — 3–5 keyworded pins per article; huge for how-to content.
3. **Reddit / Facebook groups** — the 90/10 value rule (explained in the blogging guide).
4. **Internal links** — every new post links to 2–3 older ones.

## 6. Honest expectations

| Milestone | Typical timeframe |
|---|---|
| Site live, first articles | Day 1 |
| AdSense-ready (20–30 posts) | Weeks 4–8 |
| AdSense approval | Month 2–4 |
| First $10–100/month | Month 5–9 |
| $100–500/month | Month 12 (consistent effort, commercial niche) |

The people who earn are the ones who publish through the silent months. Good luck — and start with
`posts/side-hustles-zero-investment.html` if you want earnings *this week* while the blog grows. 🚀
