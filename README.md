# 🧠 Real-Time Visitor Analytics System

A full-stack Bun + Express + PostgreSQL + WebSocket project that tracks visitor activity across websites in real-time and displays live updates on a dashboard.

## 📦 Tech Stack

- **Backend**: Bun, Express, Prisma, PostgreSQL, Zod
- **Realtime**: WebSocket (`socket.io`)
- **Logger**: Winston (custom levels, multi-file)
- **Frontend**: React + Tailwind CSS
- **DevOps**: Docker, Docker Compose

---

## 🔥 Features

### 📡 API Server

- `POST /api/events`: Receives visitor events
- `GET /api/analytics/summary`: Returns live stats
- `GET /api/analytics/sessions`: Returns active sessions with journey and duration
- Rate limited and schema validated

### 🔁 WebSocket Server

- Bi-directional communication with dashboards
- Server → Client:
  - `visitor_update`
  - `user_connected`, `user_disconnected`
  - `session_activity`
  - `alert` (optional)
- Client → Server:
  - `request_detailed_stats`
  - `track_dashboard_action`
d
### 🧠 In-Memory Session Tracking

- Stores active sessions using `Map`
- Tracks journey and duration
- Deletes on `session_end`

### 🎛️ React Dashboard

- Real-time UI using WebSocket
- Dashboard count, live stats, session view
- Filter by page or country

---

## 🚀 Getting Started

### 1. Clone + Setup

```bash
git clone <repo>
cd visitor-analytics
cp .env.example .env
