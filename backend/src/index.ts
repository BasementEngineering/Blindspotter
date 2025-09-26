import hello from "@routes/hello";
import { Hono } from "hono";

const app = new Hono()

app.route('/api/hello', hello)

export default app
