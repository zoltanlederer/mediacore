# MediaCore

Node/Express/TypeScript API for browsing a media library (reads from a Python-fed SQLite database).

Part of a three-project series: `MediaCore` → `MediaReco` → `MediaHome`.

## Stack
- Node.js, Express, TypeScript
- better-sqlite3
- Demo dataset: 287 titles from a personal Plex library

## Features
- `GET /media` — list titles, with optional filtering and pagination
  - `?genre=Action` — filter by genre (partial match)
  - `?type=movie` or `?type=tv_show` — filter by media type (exact match)
  - `?page=2&limit=20` — pagination
  - Filters can be combined, e.g. `?genre=Action&type=movie&page=2`

## Known Limitations
- Genre filtering supports one genre at a time. Multi-genre search (e.g. Action *or* Comedy) is planned for Project 13 (`MediaHome`).

## Status
In progress — GET routes with filtering/pagination complete. POST route (mark as watched) next.