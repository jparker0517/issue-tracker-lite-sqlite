![Node CI](https://github.com/jparker0517/issue-tracker-lite-sqlite/actions/workflows/node-ci.yml/badge.svg)


# Issue Tracker Lite – SQLite + Tests

A small full‑stack JS app with persistent storage using **SQLite** and API tests using **Jest + Supertest**.

## Live Demo
https://issue-tracker-lite.onrender.com


## Features
- List / Create / Toggle Resolved / Delete issues
- SQLite persistence (default file `data.db`)
- Jest + Supertest API tests
- Vanilla JS frontend
- Architecture + request lifecycle diagrams included

## Run
```bash
npm install
npm start
# http://localhost:3000
```

## Tests
```bash
npm test
```

## API
- `GET /api/issues` → list
- `POST /api/issues` → create `{ title, description, priority }`
- `PATCH /api/issues/:id` → toggle or set `{ resolved?: boolean }`
- `DELETE /api/issues/:id` → remove

## How It Works (Architecture + Request Lifecycle)
See the images in the repo and the snippet in `README_how_it_works_snippet.md`.
