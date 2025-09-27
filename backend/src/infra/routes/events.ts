import { Hono } from "hono"
import { streamSSE } from "hono/streaming"

const events = new Hono()

// Store for SSE connections with unique IDs
const sseConnections = new Map<string, any>()

// SSE endpoint for clients to connect
events.get('/stream', (c) => {
  return streamSSE(c, async (stream) => {
    const connectionId = Date.now().toString() + Math.random().toString(36)

    // Store this connection
    sseConnections.set(connectionId, stream)

    // Send initial connection message
    await stream.writeSSE({
      data: JSON.stringify({ type: 'connected', timestamp: new Date().toISOString(), connectionId }),
      event: 'connection'
    })

    // Keep connection alive with heartbeat
    const heartbeat = setInterval(async () => {
      try {
        await stream.writeSSE({
          data: JSON.stringify({ type: 'heartbeat', timestamp: new Date().toISOString() }),
          event: 'heartbeat'
        })
      } catch (error) {
        // Connection closed, clean up
        clearInterval(heartbeat)
        sseConnections.delete(connectionId)
      }
    }, 30000) // 30 seconds heartbeat

    // Clean up when connection closes
    stream.onAbort(() => {
      clearInterval(heartbeat)
      sseConnections.delete(connectionId)
    })
  })
})

// Hook endpoint to send messages to all connected clients
events.post('/hook', async (c) => {
  try {
    const data = await c.req.json()

    // Send to all connected SSE clients
    const messageId = Date.now().toString()
    const deadConnections: string[] = []

    for (const [connectionId, stream] of sseConnections.entries()) {
      try {
        await stream.writeSSE({
          data: JSON.stringify(data),
          event: 'message',
          id: messageId
        })
      } catch (error) {
        // Mark connection for removal
        deadConnections.push(connectionId)
      }
    }

    // Remove dead connections
    deadConnections.forEach(id => sseConnections.delete(id))

    return c.json({
      success: true,
      message: 'Data sent to SSE clients',
      connectedClients: sseConnections.size
    })
  } catch (error) {
    return c.json({
      success: false,
      error: 'Failed to process hook data'
    }, 400)
  }
})

export default events