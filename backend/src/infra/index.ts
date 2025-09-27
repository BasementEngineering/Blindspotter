import hello from "@routes/hello";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono()

// API routes
app.route('/api/hello', hello)

// Serve static files from public directory
app.use('/*', serveStatic({ root: './public' }))

// Fallback to index.html for SPA routing
app.get('*', serveStatic({ path: './public/index.html' }))

export default app
