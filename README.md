# CK APP Website

The new CK APP marketing website, built with **Quasar, Vue 3, TypeScript, and CSS** and deployed through GitHub Pages.

## Local Development

Requires Node.js 24 or later.

```sh
npm ci
npm run dev
```

The landing page is in `src/pages/HomePage.vue`. The feature overview and detail pages are in `src/pages/FeatureIndex.vue` and `src/pages/FeatureDetail.vue`. Shared navigation, download buttons, and footer components are in `src/components/`.

Styles are in `src/css/app.css` and `src/css/feature-pages.css`. Typed feature content is maintained in `src/data/core-features.ts` and `src/data/campus-features.ts`.

The design uses campus-inspired blue, an interactive phone preview, and semantic colors that follow system light/dark appearance. Layouts respond to enlarged text, keyboard focus, reduced motion, and increased contrast. The review, tokens, and verification record are in [docs/design-review.md](docs/design-review.md).

Check types, build the website, and preview the production build:

```sh
npm run typecheck
npm run build
npm run preview
```

## Complete Feature Guide

`/features/` provides a searchable overview with category filters. Fourteen detailed pages cover Today, Timetable, Calendar and tasks, Cafeteria, Nearby food, School news, Student council announcements and notifications, Transport, Partner shops, Souvenirs, Dance tickets, Decision helper, iOS widgets, and Getting started/settings.

Each page includes capabilities, usage steps, relevant limits, FAQs, related features, and clearly labeled interface examples. Content follows the app's actual implementation.

## GitHub Pages

`.github/workflows/deploy.yml` builds and deploys `dist/` when changes are pushed to `main`. Pull requests run build validation only.

In the repository, set **Settings → Pages → Source** to **GitHub Actions**. The workflow automatically detects the Pages base path and supports both project URLs and custom domains. To test a project base path locally:

```sh
BASE_PATH=/Website/ npm run build
BASE_PATH=/Website/ npm run preview
```

The build emits a separate `index.html` for the overview and every detail page, so direct links and refreshes work on GitHub Pages. It also generates unique page metadata, canonical URLs, a sitemap, and a friendly 404 page. The workflow reads `SITE_ORIGIN` from Pages configuration to support custom domains.

## Content and Assets

- The App Store and Google Play buttons link to CK APP's official download pages.
- The student council website is linked at `https://cksc.tw/`.
- The phone preview, class schedule, menu, and transportation information are feature demonstrations, labeled as such on the page.
- App examples share `AppInterfacePreview.vue` and the `App*Preview.vue` components. They follow CK APP's native iOS source layouts, with isolated light/dark tokens in `src/css/app-previews.css`; see [the UI consistency record](docs/app-ui-consistency.md).
- `public/assets/ck-app-icon.png` uses an existing CK APP brand asset.

Contact: ckappofficial@gmail.com · [Instagram](https://www.instagram.com/ckappofficial/)
