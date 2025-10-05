# Monitoring Dashboard — Phase 1

A simple monitoring dashboard application (frontend + backend)  
Polls and visualizes mock metrics.

---

## Architecture Overview

This project is divided into two services:

- **Backend service** (Node.js + Express)  
  Exposes a `GET /metrics` endpoint returning simulated metrics JSON:
  - `cpu_percent` (e.g. 0–100)  
  - `latency_ms`  
  - `active_users`  
  - `request_count` (increasing counter)  
  - `timestamp`

- **Frontend app** (React + Vite + Chart.js)  
  Polls the backend every 10 seconds, displays the latest values in metric cards, and plots time series charts.

The two services run on different ports (backend on `3001`, frontend on `5173`).

