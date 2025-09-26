import app from "./src/infra";

const port = 3000
console.log(`Hono server running at http://localhost:${port}`)

Bun.serve({ fetch: app.fetch, port })
