# Talks editorial record

Reviewed: 2026-11-01 (America/Santiago).

## Evidence and date policy

`src/data/talks.json` contains one past appearance per event, stable IDs, original title, material language, event date at supported precision, resources and per-entry provenance. UI language does not alter the title. A material-language badge does not claim that a recording was spoken in that language when only the slides were inspected. Unconfirmed modality is omitted.

The first selection contains 15 appearances. Event years/months may be grounded in Armando's slide archive; individual days are used only when an event-specific cover or explicit description supports them. Speaker Deck upload dates and Google Drive timestamps are not occurrence dates. Partial dates sort within their year using zero padding solely as a deterministic tie-break; an unknown month/day is never displayed as an invented date.

Public links point to existing Speaker Deck publications, recordings, code or Sessionize. No Drive sharing changes or reuploads were performed. Some direct video links are older; their association is supported by the original deck description, but player availability may change.

## Owner confirmation

Armando confirmed in this chat on 2026-11-01: Un futuro sin juniors was delivered virtually at Nerdearla Argentina in 2025. Gemini Nano/on-device models, La ilusión de la memoria and Leading Communities by Teaching have not yet been delivered. The organizer's NERDflix page confirms title, speaker, year, Argentina and Spanish: https://nerdearla.com/nerdflix/9YjlJN4pRh0/ . The exact occurrence day was not confirmed, so the archive displays 2025.

## Retained in the backlog

- Not yet delivered: Gemini Nano/on-device models, La ilusión de la memoria, Leading Communities by Teaching. Also do not infer delivered status for SSL Pinning or AI Bootcamp from folder dates alone.
- DevFest Lima 2024 graphics: event folder suggests this appearance, but a reused cover says November 16 while an organizer recap dates DevFest Lima to November 30. Hold until the event-specific title/material is confirmed. Do not copy the cover date into this event. Recap: https://es.linkedin.com/posts/gianmarco-guerrero-menacho_devfest2024-gdgopenlima-dscutp-activity-7272884246468247552-gg_7 .
- mDevConf 2024: separate folder and cover support November 16; Sessionize corroborates the title/language. No public slide URL is exposed; the resource is the public session description. Modality and location remain unknown.
- Kotlin Everywhere La Paz 2019: explicit folder names support August 24 and title/speaker appear on the cover; find an event-specific public material link before adding. It is not the same appearance as DevFest Santiago.
- Community Nation 2023 / Construyendo Comunidades Duraderas: preserve credit for Camilo Alzate; no public event-specific resource identified yet.
- Android Dev Perú / Studio Bot, TECSUP / Desarrolladores en tiempo de constante cambio, MotionLayout / DevFest Brasil, mDevConf 2020 / Cómo formar un equipo: event context is in folder names; find public event-specific material before publishing.
- Gemini in Android Studio, Dibujo en Compose, Clean Architecture, StateFlow/SharedFlow and generic Kotlin content: public material exists but event mapping needs further confirmation. In particular, do not reuse approximate dates from the old contributions timeline as verified evidence.
- Exclude external/reference decks, templates and empty presentations. A title or filename alone does not establish authorship or delivered status.

## Maintenance

For a new appearance: verify title, named event, supported date precision, language evidence and at least one event-specific public resource; include provenance. Use separate appearance IDs for the same talk at different events. Preserve titles in their original language, and retain speaker/coauthor credits where present. Do not add an Event schema with invented full dates. Run the story checks before deployment.
