# Product Store – CRUD Day 2

A small product browser built in plain HTML/CSS/JS that fetches catalog data from DummyJSON, shows a responsive grid, and renders detailed product views with loading states and toasts. Created while collaborating with a Top Rated Plus freelancer on Upwork—I handled the front-end logic, API wiring, and UI polish.

## Features
- Product listing with category, price, and description summaries.
- Single-product detail view with brand, metadata, shipping info, and customer reviews.
- Loading overlays and toast notifications for success/error feedback.
- Responsive grid layout that adapts to mobile and desktop.
- Clean folder structure (`css/`, `js/`) ready for hosting on Netlify/Vercel/GitHub Pages.

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript (fetch API for data)
- Data source: https://dummyjson.com

## Project Structure
```
.
├─ index.html
├─ css/
│  └─ style.css
└─ js/
   ├─ script.js       # page flow, data fetching, rendering
   └─ utilities.js    # reusable toast helper
```

## Run Locally
1) Clone the repo: `git clone https://github.com/yusufdupsc1/crud-day2`  
2) Open `index.html` in your browser, or run a quick dev server (`npx serve .` or `python3 -m http.server 3000`) and visit `http://localhost:3000`.

## Deployment
- Drop the folder into Netlify/Vercel/GitHub Pages—no build step required.
- Update the README with the live URL after deploying so clients can preview fast.

## Next Steps (optional polish)
- Add search/filter and pagination on the products list.
- Cache the product list locally to reduce repeat fetches.
- Swap DummyJSON for a small backend (Supabase/Node) to demonstrate persistence.
- Add basic tests (e.g., with Playwright) to verify list/detail flows.
