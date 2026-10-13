# CK APP Website

CK APP 的全新形象網站，以 **Quasar、Vue 3、TypeScript 與 CSS** 製作，透過 GitHub Pages 發布。

## 本機開發

需要 Node.js 24 以上。

```sh
npm ci
npm run dev
```

主要頁面位於 `src/App.vue`，樣式位於 `src/css/app.css`。

```sh
npm run typecheck
npm run build
npm run preview
```

## GitHub Pages

`.github/workflows/deploy.yml` 會在推送至 `main` 時建置並發布 `dist/`。Pull request 只執行建置驗證。

Repository 的 **Settings → Pages → Source** 設為 **GitHub Actions**。Workflow 會自動讀取 Pages 路徑，支援專案網址與自訂網域。本機也能驗證專案路徑：

```sh
BASE_PATH=/Website/ npm run build
npm run preview
```

## 內容與素材

- App Store 與 Google Play 按鈕連結至 CK APP 的正式下載頁面。
- 班聯會官網連結為 `https://cksc.tw/`。
- 手機預覽、課表、菜單與交通資訊為功能示意，已在頁面標示。
- `public/assets/ck-app-icon.png` 使用 CK APP 現有品牌素材。

聯絡：ckappofficial@gmail.com · [Instagram](https://www.instagram.com/ckappofficial/)
