# CK APP website UI consistency review

Reviewed 2026-10-13. **Rating: Good.** The revised website previews follow CK APP's source-defined screen hierarchy, labels, colors and component roles. Exact native pixel identity has not been established.

## Scope and evidence

The website uses Vue, Quasar and CSS; CK APP uses React Native/Expo with native SwiftUI components on iOS and Jetpack Compose components on Android. The previews help students recognize the app screens described in each guide.

Comparison was based on the sibling `../App` repository. A native simulator build and launch were attempted, but Safari remained in the foreground and no usable CK APP screen was obtained. Those captures were excluded from the comparison. Visual and responsive QA was performed on the website in Chromium; no native screenshot comparison is claimed.

The previews explicitly use the **iOS** implementation as their reference. Android preserves the app's features but uses Material 3 surfaces, controls, symbols and toolbar arrangements. The website does not imply that Android renders the iOS interface.

## Original mismatches and corrections

Priorities describe the original mismatch, before correction.

| Priority | Original mismatch | Corrected website component and app evidence |
| --- | --- | --- |
| High | Homepage samples used custom marketing layouts instead of the app's daily information hierarchy. | `AppTodayPreview.vue` and `AppNowPreview.vue`: class action, 今天, navy 現在 card and bell rail, 班聯公告, 今日, 午餐, 回家 and pinned news sections. Evidence: `App/src/features/home/screen.tsx`, `home/sections.tsx`, `home/now.ts`, `ui/ios/now-card.tsx`. |
| High | Timetable and calendar previews omitted the full native structures. | `AppSchedulePreview.vue`: five weekdays, eight periods, subject colors and weekday lists at enlarged text sizes. `AppCalendarPreview.vue`: month grid, day selection, holidays/exams, event and todo sections. Evidence: `App/src/features/schedule/screen.tsx`, `ui/ios/timetable-grid.tsx`, `features/todo/screen.tsx`, `ui/ios/calendar.tsx`. |
| High | Cafeteria and nearby restaurants shared a decorative plate illustration. | `AppFoodPreview.vue`: 美食 title, 熱食部/附近 switch, cafeteria week/day controls and numbered dish/price rows; nearby search, filters, map illustration, distance/status rows and favorites. Evidence: `App/src/features/food/tab.tsx`, `food/screen.tsx`, `menu/screen.tsx`, `ui/ios/day-strip.tsx`. |
| High | Guide cards combined unrelated controls and descriptive placeholders rather than actual screens. | `AppFeaturePreview.vue`: 校網 search and four filters; separate 公告 navigation title with 班聯公告 list; 交通 hub with its three native destinations. Evidence: `App/src/features/news/screen.tsx`, `announcements/screen.tsx`, `transport/screen.tsx`, `app/_layout.tsx`. |
| High | Partner, shop and decision-helper samples used generic link tiles or an orbit illustration. | `AppFeaturePreview.vue`: 建北特約 qualification text and five external rows; native shop loading state; multiline options, 再選一次 and 就選這個. Evidence: `App/src/features/promo/screen.tsx`, `souvenir/screen.tsx`, `tickets/screen.tsx`, `help/screen.tsx`. |
| High | Widget and setup samples mixed marketing copy with interface elements that do not appear together in the app. | `AppFeaturePreview.vue`: navy small/medium widgets with period, subject, countdown, rail and upcoming lessons; welcome triangle, 你是哪一班？, grade selection, class grid, start and skip actions. Evidence: `App/src/widgets/now-widget.tsx`, `features/welcome/screen.tsx`, `ui/ios/blocks.tsx`. |
| Medium | Campus navigation, feature icons and preview appearance were inconsistent with the native app. | `AppCampusPreview.vue` and shared preview styles: 校網/交通/學生福利/工具 grouping; storefront, bag, ticket and question-mark icons; system font stack, grouped surfaces and light/dark tokens. Evidence: `App/src/features/campus/screen.tsx`, `features/registry.ts`, `components/icons.ts`, `navigation/tab-stack.tsx`, `theme/use-palette.ios.ts`. |

App evidence paths above are relative to the parent GitHub directory: for example, website `../App/src/features/news/screen.tsx`.

The native iOS list uses `insetGrouped`; root tabs have large titles and pushed campus screens have compact titles. The source accent is `#03328D` in light appearance and `#8EAEFF` in dark appearance; the 現在 card/widget uses `#03328D` / `#17377F`. Sources: `App/src/ui/ios/list.tsx`, `navigation/stack-options.ts`, `theme/use-palette.ios.ts`, `theme/brand.ts`. Android's separate palette comes from Material 3 roles seeded with CK navy in `theme/use-palette.android.ts`.

## Deliberate web adaptations

- Fixtures are local sample data. Course names, dates, announcements, menu items, restaurants and transportation values do not represent live information. Guide captions disclose this.
- Shop content is a remote WebView in CK APP. The website shows the source-defined loading indicator and browser action, with a loading-state caption; it neither requests nor fabricates current souvenir or ticket-store content.
- Native semantic colors cannot be reproduced as dynamic UIKit colors in CSS. Web tokens approximate their light/dark roles. Secondary labels are strengthened for the smaller previews: `#606067` on white is **6.24:1**, and `#ABABAF` on `#1C1C1E` is **7.43:1**. Increased-contrast CSS provides stronger label/separator values.
- Adjacent-month dates keep the readable secondary label rather than reduced opacity. Holiday red uses `#C62828` in light mode and `#FF6961` in dark mode to retain readable small date labels.
- Rem-based type and container queries preserve the normal arrangement, then reduce nested gutters, stack crowded rows/widget columns and wrap class choices at enlarged text sizes. Content grows vertically instead of clipping.
- Static pictured controls do not masquerade as operable buttons. Interactive samples use local state or navigate to website guides; they do not change app data or contact its backend.

These adaptations apply Apple's foundations to a website, rather than asserting that HTML controls are native iOS controls.

## Design principles applied

The following local Apple Design skill references were read for this review:

- [layout.md › Adaptability](../.agents/skills/apple-design/references/hig/layout.md): “Be prepared for text-size changes.” Layout responds to available width and enlarged type.
- [typography.md › Supporting Dynamic Type](../.agents/skills/apple-design/references/hig/typography.md): “Consider adjusting your layout at large font sizes.” Narrow multicolumn previews become readable stacked content.
- [accessibility.md › Vision](../.agents/skills/apple-design/references/hig/accessibility.md): “Support larger text sizes.” Verification includes 200% text enlargement and both appearances.
- [branding.md › Best practices](../.agents/skills/apple-design/references/hig/branding.md): “Express your brand with familiar components.” CK navy and the bell rail carry the identity while the app's recognizable lists and navigation carry the interface.
- [color.md › Inclusive color](../.agents/skills/apple-design/references/hig/color.md): “Avoid using colors that make it hard to perceive content in your app.” Text contrast is measured from CSS values; status information retains text or shape alongside color.

Craft judgment: the school's daily bell schedule is the distinctive visual element. Removing the decorative plate, orbit and route artwork improves fidelity and leaves the useful app content as the focus.

## Verification record

- Initial Chromium sweep: **85** route/viewport/appearance states; **0 JavaScript errors** and **0 measured text-contrast failures**. It identified narrow-layout overflows that were subsequently corrected.
- Targeted post-fix check: all **9** `AppFeaturePreview.vue` guides at **390 px viewport / 200% text**, each with a 204 px inner component width, had **0 overflowing descendants**.
- Final Chromium sweep: **85** route/viewport/appearance states, including 200% text and 320px phone previews: **0 layout overflows**, **0 JavaScript errors**, and **0 failures among measured text nodes**. The contrast sweep excludes decorative and ARIA-hidden text; token measurements and the date-label adjustments above supplement it.
- Local interaction checks passed for all five tabs, scroll reset, the 現在 card opening 課表, 42 Sunday-first calendar dates, month navigation, returning to 今天, task completion, feature search, category filters and empty-state recovery.
- TypeScript and the Vite production build pass; all 16 static pages are generated. The decorative line above the phone and the pale top seam in dark mode were removed.
- An additional final screenshot run was blocked because automatic approval review reached its usage limit. Earlier website screenshots and the final layout/interaction run were available; no exact native screenshot comparison is claimed.

The Good rating describes source alignment and the verified website behavior. Native system materials, glyph rendering and exact runtime spacing remain outside the available comparison evidence.
