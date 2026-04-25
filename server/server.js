import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import contactRouter from './routes/contact.js';
import bookingRouter from './routes/booking.js';

const app = express();
const PORT = process.env.PORT || 5000;

/* ──────────────── Middleware ──────────────── */

// CORS — allow frontend origin
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:3000',
  'http://localhost:5173', // Vite default
].filter(Boolean);



app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

/* ──────────────── Routes ──────────────── */

app.use('/api/contact', contactRouter);
app.use('/api/book', bookingRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ──────────────── Error Handling ──────────────── */

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

/* ──────────────── Start Server ──────────────── */

app.listen(PORT, () => {
  console.log(`\n⚡ MBC4 Fitness server running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});
