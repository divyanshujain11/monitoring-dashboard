const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Simple in-memory counter
let requestCount = 0;

// Optional: simulate slowly-changing baseline values stored globally to show trends
let baselineCpu = 20;

function randBetween(min, max) {
  return Math.random() * (max - min) + min;
}

app.get('/metrics', (req, res) => {
  requestCount++;

  // Simulate metric values
  baselineCpu += randBetween(-1, 1);
  if (baselineCpu < 5) baselineCpu = 5;
  if (baselineCpu > 95) baselineCpu = 95;

  const cpu_percent = Number((baselineCpu + randBetween(-2, 2)).toFixed(2));
  const latency_ms = Math.round(randBetween(20, 350)); // ms
  const active_users = Math.max(1, Math.round(randBetween(5, 150)));
  const timestamp = new Date().toISOString();

  res.json({
    cpu_percent,
    latency_ms,
    active_users,
    request_count: requestCount,
    timestamp
  });
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
