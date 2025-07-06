# Repo Finder

A full-stack mini-app to search and filter public GitHub repositories by username.

## Features
- **Backend:** FastAPI service with `/repos/{username}` route, returns name, description, and star count for each repo.
- **Frontend:** Next.js (TypeScript, Tailwind, JetBrains Mono font, shadcn/ui style), with:
  - Username input
  - Loading, error, and no results states
  - Repo list with client-side filter
- **Dockerized:** Both backend and frontend, with `docker-compose.yml` for easy orchestration.

## Getting Started

### Local Development

#### Backend
```sh
cd workspace/backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn httpx
uvicorn main:app --reload
```

#### Frontend
```sh
cd workspace/frontend
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and search for any GitHub username.

### Docker

To run both services together:
```sh
docker-compose up --build
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000](http://localhost:8000)

## Project Structure
- `workspace/backend/` — FastAPI backend
- `workspace/frontend/` — Next.js frontend
- `workspace/docker-compose.yml` — Docker orchestration

---
Built for rapid prototyping and demo purposes.
