# MediaCore

Full-stack app for browsing a personal media library: a Node/Express/TypeScript API on top of a Python-fed SQLite database, and a React/TypeScript frontend.

Part of a three-project series: `MediaCore` → `MediaReco` → `MediaHome`.

## Stack
- **Backend**: Node.js, Express, TypeScript, better-sqlite3
- **Frontend**: React, TypeScript, Vite, React Router
- Demo dataset: 287 titles from a personal Plex library

## Backend

- `GET /media` — list titles, with optional filtering and pagination
  - `?genre=Action` — filter by genre (partial match)
  - `?type=movie` or `?type=tv_show` — filter by media type (exact match)
  - `?page=2&limit=20` — pagination, response includes total count
  - Filters can be combined, e.g. `?genre=Action&type=movie&page=2`
- `GET /genres` — deduplicated, sorted list of all genres in the library
- `PATCH /media/:index/watched` — toggles a title's watched status

## Frontend

- List view (`/`) — data table with clickable titles, genre/type filter dropdowns, pagination controls, and an inline watched-status toggle
- Detail view (`/media/:index`) — full info for a single title
- Filters and pagination are stored in the URL (not just component state), so the current view is refresh-safe, bookmarkable, and works with browser back/forward
- Shared state (fetched data, filters, handlers) is provided via `useContext`, avoiding prop drilling across components

## Known Limitations
- Genre filtering supports one genre at a time. Multi-genre search (e.g. Action *or* Comedy) is planned for `MediaHome` project.
- `Sci-Fi` and `Science Fiction` currently appear as separate genre values due to inconsistent labeling from different data sources — planned fix in `MediaHome` project.
- No visual styling yet (functional but unstyled).

## Status
Core functionality complete: backend routes, filtering, pagination, and a fully working React frontend with routing, forms, and context. Remaining: styling and deployment.