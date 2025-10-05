const express = require('express');
const cors = require('cors');  // <-- add this

const app = express();
const port = 3001;

// Enable CORS for all origins
app.use(cors());

let requestCount = 0;

function getRandom(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

app.get('/metrics', (req, res) => {
  requestCount++;
  const metrics = {
    cpu_percent: parseFloat(getRandom(5, 90)),
    latency_ms: parseFloat(getRandom(50, 500)),
    active_users: Math.floor(getRandom(5, 50)),
    request_count: requestCount,
    timestamp: new Date().toISOString(),
  };

  res.json(metrics);
});

app.listen(port, () => {
  console.log(`Metrics server running at http://localhost:${port}`);
});
