# Increment: event-linked talks archive

## Scope and publication rule

Publish an initial, curated archive at `/es/talks/` and `/en/talks/`. Include only past speaking appearances that can be associated with a named event/community and at least a year. Keep original titles across site languages, and show a language label for the talk/material. Retain the existing editorial design, dependencies, publications and contributions route. No automatic Drive synchronization, uploads, permission changes, translated talk titles or unpresented proposals.

## US-01 — Find an appearance and its material

As a visitor, I want to browse talks from newest to oldest and see the event and available materials, so I can follow Armando's speaking activity.

Acceptance: one entry per event appearance; group by descending year and sort known dates descending. Store dates only at their supported precision (year, month or day); never substitute deck upload dates for occurrence dates. Expose slides, recording, session or code only when identified. Keep provenance in the data/editorial record. Unknown modalities are omitted, and unavailable links are omitted.

Tests: chronological ordering, unique appearance IDs, valid partial dates and HTTPS sources; generated HTML has the expected events, links and date precision. Repeated talk titles at distinct events remain independent.

## US-02 — Change site language without changing talk titles

As a Spanish- or English-speaking visitor, I want localized navigation and section labels while each talk retains its original title and language label.

Acceptance: navigation and heading read Charlas in Spanish and Talks in English. The language switch preserves `/talks/`. Both pages show identical original titles in identical order. Language names, action labels and date formatting follow the site locale. Titles carry their own language attribute. Mobile navigation includes the section.

Tests: render both locale pages, compare all talk titles, verify language badges, partial-date formats, route alternates and invalid-locale 404; browser-check desktop/mobile navigation, theme switching and locale switching.

## US-03 — Publish a traceable initial selection

As the site owner, I want only supported past appearances published, so draft slides are not portrayed as delivered talks.

Acceptance: Nerdearla Argentina 2025 is virtual and Spanish, confirmed by Armando and the organizer's recording page. Gemini Nano, La ilusión de la memoria and Leading Communities by Teaching remain excluded because Armando confirmed they have not been delivered. Disputed event dates and unmatched material remain in the editorial backlog. Add canonical/hreflang metadata and sitemap entries. Preserve the previously deployed commit in a dated archive branch before release.

Checks: Jest suite, ESLint, TypeScript/production build, generated HTML, browser verification at desktop/mobile widths and both themes; verify GitHub deployment and both public URLs. Use the web repository's checks; Android qualityw does not apply to this repository.

## US-04 — Continue from a talk into relevant YouTube material

As a visitor, I want the event recording and clearly identified related tutorials next to a talk, so I can revisit the presentation and practice its subject without confusing a tutorial with a recording of that appearance.

Scope: enrich the existing Talks / Charlas archive only. Preserve existing appearances, original titles, dates, resources, dependencies and quality checks. An additional past appearance may be added when newly discovered organizer metadata explicitly identifies speaker, named event and supported date precision. No new Learn section, embeds, auto-sync, video uploads, permission changes or inferred event dates.

Acceptance: add an event recording only when title/description/organizer evidence identifies that specific appearance. Distinguish a full event broadcast from a standalone talk recording; do not invent a timestamp. Show selected thematic videos/series under a localized Practica este tema / Practice this topic group with original resource title, original-title language, material language, video/series type and a direct YouTube link. A relation by topic must never become an event recording. Keep pending candidates in the editorial record and preserve the previous deployed commit before release.

Tests: assert exact recording URLs and labels, tutorial separation, bilingual labels with original titles preserved, series metadata and absence of empty related groups. Run all Jest tests, ESLint and production build; inspect generated HTML and mobile/desktop rendering in both locales, then verify both public pages after deployment.
