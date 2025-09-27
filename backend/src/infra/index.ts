import hello from "@routes/hello";
import events from "@routes/events";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";
import profile from "@routes/profile";

const app = new Hono()

// CORS for SSE
app.use('/api/events/*', cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  allowHeaders: ['Content-Type', 'Cache-Control'],
  allowMethods: ['GET', 'POST', 'OPTIONS']
}))

// API routes
app.route('/api/hello', hello)
app.route('/api/profile', profile)
app.route('/api/events', events)

// Serve static files from public directory
app.use('/*', serveStatic({ root: './public' }))

// Fallback to index.html for SPA routing
app.get('*', serveStatic({ path: './public/index.html' }))

export default app
