# Match & Design corporate website

- This project is the corporate website. Eduscope is a separate product website.
- Work locally. Publishing, domain configuration and analytics are outside the current authorized scope.
- Treat other Business folders as read-only source material. Record company claims and assets in `docs/SOURCES.md`.
- Follow the user's latest product-status statements. A roadmap document is not evidence of a finished product.
- Keep pages static, dependencies limited, content concise, and the existing corporate logo intact.
- `src/data/site.ts` owns the Eduscope URL and contact email. Main English content is in `src/data/en.ts`.
- Pending preferences belong in `docs/KARAR_NOTLARI.md`. Do not replace missing facts with invented public claims.
- Run `npm run verify` after meaningful source changes. Use the browser for layout and interaction checks. Keep the actual validation scope in `qa/QA_RAPORU.md`.
- Port 4321 belongs to another local service. This project's configured development port is 4322. Never stop unrelated processes.
