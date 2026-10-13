# CK APP website redesign

Design record · 13 October 2026 · Vue 3, Quasar, TypeScript, CSS

Update: the campus-window background behind the homepage phone was removed at the user's request. The original design plan below records the initial direction; the phone now sits directly on the page background.

## Context and thesis

CK APP helps 建國中學 students manage a school day: classes, plans, lunch, campus information, and the trip home. This marketing page has one job: make that usefulness clear enough for students to try the preview and download the app. Its defining visual is a blue campus-window arch around the interactive phone, drawn from the arched windows of the Red Building in the existing CK APP illustration.

This is a responsive website. Apple's accessibility, hierarchy, typography, color, writing, and restraint principles apply; native iOS tab placement, macOS menu bars, and Liquid Glass conventions do not become website requirements. Review evidence is source code and the existing brand image. The completed implementation was checked in local Chromium; manual screen-reader and Safari testing were not performed.

## Before review

Overall: **Critical issues** due to text-contrast failures.

| Severity | Finding in the original implementation | Concrete response |
| --- | --- | --- |
| Critical | Inactive preview tabs use `#969dac` on white: **2.72:1**. Hero notes use `#778196` on `#f7f8f4`: **3.67:1**. Small row metadata uses `#8a93a1` on white: **3.10:1**. | Use the secondary text token below, which clears 4.5:1 on both regular and tinted surfaces. |
| Critical | Food and transport eyebrows measure **2.88:1** (`#8b9275` / `#f1f2e7`) and **2.84:1** (`#9d8b7d` / `#f3eeea`); the school caption measures **2.69:1** (`#8a9489` / `#eceee8`). | Remove decorative eyebrows or use semantic secondary text. |
| High | Mobile scales the interactive phone to `0.84`; its 7px labels become about 5.9px and nominal 38px tab widths become about 32px. | Do not transform-scale live controls. Give preview buttons at least 44px hit regions and readable labels. |
| High | Three newly added footer URLs lack a scheme and resolve as local routes. The mobile `.copyright span:last-child` rule hides the newly added developer credits. | Add `https://` to those destinations; render credits at every width with wrapping. |
| Medium | Feature lists, detailed sections, and a second preview picker repeat the same five concepts. Section and feature numbers imply a sequence that does not exist. | Keep one preview and five feature controls; use an actual school-day timeline where order carries meaning. |
| Medium | Many 8–13px labels and descriptions become smaller on mobile; fixed preview dimensions need scrutiny when text grows. | Use rem-based type, growing containers, and a stacked compact layout. Validate 200% text enlargement. |
| Craft judgment | Lime confetti, geometric ornaments, repeated English taglines, and arbitrary numbering compete with the product's existing campus identity. | Spend the visual emphasis on the architectural arch and useful app content. |

Keep the existing skip link, native links, FAQ `details` / `summary`, preview selection state and status announcement, Escape/outside-click menu dismissal, store destinations, and reduced-motion fallback. Main original brand blue already has **10.67:1** contrast on its paper surface; its useful role survives the redesign.

## Implementation design plan

### Color tokens

Use six semantic pairs as CSS custom properties. Follow `prefers-color-scheme` for appearance. Ratios below use WCAG relative luminance from the exact hex values; they measure foreground text against the named solid surface, not gradients or images.

| Role | Light | Dark |
| --- | --- | --- |
| Page | `#f7f9fc` | `#101827` |
| Surface | `#ffffff` | `#192336` |
| Content | `#172943` | `#edf2fa` |
| Secondary | `#58657a` | `#b4bed1` |
| Accent | `#03328d` | `#a9c5ff` |
| Tint | `#eaf0fb` | `#223654` |

| Text role | Light / surface | Light / tint | Dark / surface | Dark / tint |
| --- | --- | --- | --- | --- |
| Content | 14.64:1 | 12.79:1 | 13.99:1 | 10.84:1 |
| Secondary | 5.90:1 | 5.16:1 | 8.41:1 | 6.51:1 |
| Accent | 11.38:1 | 9.95:1 | 9.08:1 | 7.03:1 |

Reserve accent-filled controls for download and selected preview state. Keep text and icons paired with selection/status meaning. A filled dark-mode accent control uses dark content for its label; white text on the pale dark-mode accent would fail. Treat borders as grouping aids, not as the sole way to identify an interactive control.

### Type

Use the system UI stack with PingFang TC and Microsoft JhengHei for Traditional Chinese. The display uses the same family at weight 700, `clamp(3rem, 6.2vw, 5rem)` (48–80px at the default 16px root); personality comes from confident Chinese typography and campus architecture rather than an unrelated typeface. Body text is `1.0625rem` (17px), line-height `1.8`. Section titles are approximately `2–3rem`; card headings `1.25–1.5rem`. Utility text is `0.75–0.875rem` (12–14px), with a `0.6875rem` (11px) minimum inside the phone demonstration, with SFMono-Regular / ui-monospace reserved for times and compact data. Do not fix the root font size or compress body copy at compact widths.

### Layout and signature

Use a calm split hero at regular widths, then stack copy, actions, and preview at compact widths; follow with the meaningful day timeline, five clickable feature cards linked to the same preview, two visual detail cards, student/about content, FAQ, download, and a grouped footer.

Regular width:

```text
+--------------------------------------------------------------+
| CK APP                    Features  About  Council  [Download] |
|                                                              |
| Campus promise                  /----------------------\     |
| Large Chinese headline         | blue campus-window arch |    |
| Supporting copy                |   interactive phone     |    |
| [Download]  Explore            |   five preview controls |    |
|                                \------------------------/     |
+--------------------------------------------------------------+
| Morning -------- Class -------- Lunch -------- Home            |
| Five feature cards -> same preview                            |
| [Timetable detail]              [Campus-life detail]           |
| [Existing illustration]         Student-made / contact         |
| FAQ                             Native disclosure rows         |
| Download                        [App Store] [Google Play]      |
| Grouped links / copyright / all developer credits              |
+--------------------------------------------------------------+
```

Compact width:

```text
+------------------------------+
| CK APP                [Menu] |
| Campus promise               |
| Large Chinese headline       |
| Copy                         |
| [Download]  Explore          |
|   /----------------------\   |
|  | blue campus-window arch |  |
|  | interactive phone      |  |
|  | readable controls      |  |
|   \----------------------/   |
| Morning -> Class             |
| Lunch -> Home                |
| Five wrapping feature cards  |
| Timetable detail             |
| Campus-life detail           |
| Student-made / illustration  |
| FAQ disclosure rows          |
| Store download links         |
| Grouped footer links         |
| Wrapping developer credits   |
+------------------------------+
```

The arch belongs to CKHS because the existing school illustration already shows this architectural motif. Its purpose is to frame useful content and give the page one memorable shape. Keep everything around it quiet. No continuous animation or blur; short hover/press feedback may remain, with reduced motion respected. Opaque surfaces inherently meet reduced-transparency preferences.

### Sequence and preservation

1. Correct contrast, readable text, control hit areas, focus visibility, and content wrapping.
2. Keep semantic links and buttons, accessible preview state/status, predictable menu dismissal, and native FAQ disclosures.
3. Apply the arch, spacing, typography, day timeline, feature controls, and grouped content.
4. Refine dark appearance, pointer/press feedback, mobile spacing, and credits.

Preserve the user's existing changes: `MADE FOR CK LIFE`, the hero wording `校園生活`, `CK APP Official`, `CKHS`, CK APP Instagram, CKSC Instagram, souvenir/ticket/discount destinations, contact email, and the English metadata/title in `index.html`. Preserve both existing app-store URLs. Keep the developer names and roles as supplied: **Deigo Peng (Creator), Kimi Yang (Creator), Nathan Lee (Maintainer), Chris Sun (Maintainer), Dong Chen (Maintainer)**. The founder paragraph separately uses **Diego**; do not silently rewrite the user's supplied credit spelling.

## Reference basis

References were read from the local skill snapshot. Quotes below describe the governing principle; CSS, Vue, Quasar, ARIA, and browser preferences are the web translation.

- `accessibility.md › Vision`: “Strive to meet color contrast minimum standards.” Also: “Support larger text sizes.” Apply measured contrast and at least 200% enlargement checks.
- `accessibility.md › Mobility`: “Offer sufficiently sized controls.” Use comfortable touch targets and space between adjacent controls.
- `layout.md › Visual hierarchy`: “Order content by relative importance.” Also: “Group related items to clearly express related information or functions.” Lead with product value and keep related functions together.
- `layout.md › Adaptability`: “Be prepared for text-size changes.” Keep content and functions available when the layout stacks.
- `typography.md › Supporting Dynamic Type`: “Make sure your app’s layout adapts to all font sizes.” Translate to rem sizing, browser text settings, zoom, and reflow.
- `color.md › Inclusive color`: “Avoid relying solely on color to differentiate between objects, indicate interactivity, or communicate essential information.” Retain labels and programmatic selection state.
- `buttons.md › Best practices`: “Always include a press state for a custom button.” Its recommended hit region is “at least 44x44 pt”; use 44 CSS px as the site's practical target.
- `branding.md › Best practices`: “Ensure branding always defers to content.” Use one campus-derived signature while keeping controls familiar.
- `motion.md › Best practices`: “Make motion optional.” Avoid automatic decorative movement and respect `prefers-reduced-motion`.
- `writing.md › Getting started`: “Be clear.” Keep school-day language and remove filler.
- `dark-mode.md › Best practices`: “Ensure that your app looks good in both appearance modes.” Use paired semantic tokens and verify the actual content in both.
- `designing-for-ios.md › Best practices` and `cross-platform.md › Vocabulary` inform touch comfort and translation to CSS custom properties, responsive queries, browser scaling, and ARIA. Native Apple application chrome is outside this page's scope.

## Restraint critique and verification status

The plan is specific to CKHS through the Red Building's window shape and the school's day rhythm. A generic pale surface and blue accent alone would not justify the design; the architectural frame and useful campus preview supply that connection. Remove confetti, arbitrary numeric markers, duplicate preview controls, and promotional English eyebrows that repeat adjacent Chinese copy. The remaining footer breadth serves real student destinations, so grouping and wrapping are preferable to deleting links.

The final restraint pass removed the floating next-class card because it duplicated content and crowded the phone. The campus arch remains the signature; the detailed guide pages share its color, type, spacing, and opaque surfaces. All 14 existing feature guides and their search/filter behavior remain available.

Verified with the existing local Playwright/Chromium runtime, without adding dependencies:

- Homepage at 320, 375, 390, 640, 768, 900, 1024, and 1440 CSS pixels, with no horizontal overflow. At 320px, preview tabs measure approximately 51 × 51px and keep 11px labels without transform scaling.
- 85 page/layout combinations across the homepage, guide index, and 14 guide pages, including light/dark appearance and 200% text enlargement. The calendar overflow found in that pass was corrected and retested in both appearances. A separate homepage pass covered all five preview states at 200% text and 320, 390, 768, and 1440px.
- Computed foreground/background text contrast across all 16 pages in light and dark appearance: no failures against the applicable WCAG AA text thresholds. This measures rendered solid colors and does not replace a manual accessibility audit.
- Five preview controls, task checkboxes, feature-card selection and focus transfer, FAQ disclosure, guide search, category filters, empty-state recovery, skip-link focus, keyboard menu navigation, Escape dismissal, and focus return.
- All five developer credits visible on mobile; original store and campus destinations preserved. Reduced motion switches scrolling to `auto`; increased-contrast preferences apply; surfaces remain opaque.
- `BASE_PATH=/Website/ npm run build` passes TypeScript and Vite, generating 16 static pages plus sitemap and fallback. Production browser checks pass for the homepage, guide index, representative detail pages, and fallback under `/Website/`, with no script or resource errors; the lazy campus image loads when scrolled into view.

Manual screen-reader, Safari, and real-device testing remain outside this verification. The redesign was completed locally; no deployment was performed.
