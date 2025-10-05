
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://monitoring-backend.monitoring-app.svc.cluster.local:3001';

function MetricDashboard() {
  const [metrics, setMetrics] = useState([]);

  // Fetch metrics from backend
  const fetchMetrics = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/metrics`);
      const data = await res.json();
      setMetrics(prev => [...prev, data]); // keep history for chart
    } catch (err) {
      console.error('Error fetching metrics:', err);
    }
  };

  // Poll every 10 secondses
  useEffect(() => {
    fetchMetrics(); // initial fetch
    const interval = setInterval(fetchMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  // Prepare chart data
  const chartData = {
    labels: metrics.map(m => new Date(m.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'CPU %',
        data: metrics.map(m => m.cpu_percent),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
      {
        label: 'Latency (ms)',
        data: metrics.map(m => m.latency_ms),
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
      },
      {
        label: 'Active Users',
        data: metrics.map(m => m.active_users),
        borderColor: 'rgb(53, 162, 235)',
        fill: false,
      },
      {
        label: 'Request Count',
        data: metrics.map(m => m.request_count),
        borderColor: 'rgb(255, 206, 86)',
        fill: false,
      }
    ],
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2>Metrics Dashboard</h2>

      {/* Latest values */}
      {metrics.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <div>CPU: {metrics[metrics.length - 1].cpu_percent}%</div>
          <div>Latency: {metrics[metrics.length - 1].latency_ms} ms</div>
          <div>Active Users: {metrics[metrics.length - 1].active_users}</div>
          <div>Request Count: {metrics[metrics.length - 1].request_count}</div>
        </div>
      )}

      {/* Line chart */}
      <Line data={chartData} />
    </div>
  );
}

export default MetricDashboard;
