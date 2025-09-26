import { Hono } from "hono"
import { Either, Maybe } from "purify-ts"

const hello = new Hono()

hello.get('/', (c) => {
  const result = Either.of('Hello from /api/hello with Purify!')
    .map(msg => msg.toUpperCase())

  if (result.isRight()) {
    return c.json({ message: result.extract() })
  } else {
    return c.json({ error: result.swap().extract() }, 400)
  }
})

hello.get('/maybe', (c) => {
  const value = Maybe.fromNullable(c.req.query('name'))
    .map(name => `Hello, ${name}!`)
    .orDefault('Hello, anonymous!')

  return c.json({ greeting: value })
})

export default hello

