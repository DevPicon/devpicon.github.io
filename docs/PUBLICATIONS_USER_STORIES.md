# Increment: bilingual publications

## Scope

Publish Armando's approved English article and a Spanish translation retaining key English engineering terms. Add a publications index and a link in desktop/mobile navigation. Preserve the site's design, existing pages, dependencies and quality checks. No CMS, comments service, external syndication, or private demo material.

## US-01: Discover publications

As a visitor, I want to find Armando's original publications from the main navigation, so I can read his engineering perspective.

Acceptance: `/es/publications/` and `/en/publications/` show a localized heading, article title, summary, date and reading link. Both desktop and mobile navigation expose this section. Existing contact and contributions routes remain available.

Tests: render both indexes; assert article links and localized content; check navigation in desktop/mobile browser layouts.

## US-02: Read in either language

As an English- or Spanish-speaking reader, I want the complete article in my language and a direct link to the other version, so I can follow and discuss its argument.

Acceptance: both locale routes export static HTML with the complete article, six source links, author, publication date and accurate AI drafting disclosure. Spanish preserves terms such as context engineering, spec-driven development, acceptance criteria, user story, unidirectional data flow, UI states, hooks and diff. The language switch keeps the article route. Invalid article slugs return 404. Text remains readable on mobile and in both themes.

Tests: validate localized article content, source parity, alternate-language links and missing-slug behavior; inspect desktop/mobile rendering and language switching.

## US-03: Discover the canonical versions

As a reader arriving from search or a shared link, I want correct article metadata and language alternatives, so I reach the intended version.

Acceptance: each language has its own canonical, hreflang alternatives, title, description and Article structured data. A sitemap includes both indexes and articles. Existing production content is preserved. Deployment is verified against the actual public URLs.

Tests: inspect generated HTML metadata and structured data, run the existing test suite and production build, and verify production HTTP responses after deployment.
