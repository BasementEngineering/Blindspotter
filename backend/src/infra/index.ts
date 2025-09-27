import hello from "@routes/hello";
import events from "@routes/events";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono()

// API routes
app.route('/api/hello', hello)
app.route('/api/events', events)

// Serve static files from public directory
app.use('/*', serveStatic({ root: './public' }))

// Fallback to index.html for SPA routing
app.get('*', serveStatic({ path: './public/index.html' }))

export default app
