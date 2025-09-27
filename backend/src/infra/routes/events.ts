import { Hono } from "hono"

const events = new Hono()

// Store for SSE connections with unique IDs
const sseConnections = new Map<string, any>()

// SSE endpoint for clients to connect
events.get('/stream', (c) => {
  const connectionId = Date.now().toString() + Math.random().toString(36)

  // Create readable stream
  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      const connectMsg = `event: connection\ndata: ${JSON.stringify({
        type: 'connected',
        timestamp: new Date().toISOString(),
        connectionId
      })}\n\n`

      controller.enqueue(new TextEncoder().encode(connectMsg))

      // Send heartbeat every 30 seconds
      const heartbeat = setInterval(() => {
        try {
          const heartbeatMsg = `event: heartbeat\ndata: ${JSON.stringify({
            type: 'heartbeat',
            timestamp: new Date().toISOString()
          })}\n\n`

          controller.enqueue(new TextEncoder().encode(heartbeatMsg))
        } catch (error) {
          clearInterval(heartbeat)
          controller.close()
        }
      }, 30000)

      // Store connection for hook messages
      sseConnections.set(connectionId, {
        controller,
        heartbeat
      })
    },

    cancel() {
      const connection = sseConnections.get(connectionId)
      if (connection) {
        clearInterval(connection.heartbeat)
        sseConnections.delete(connectionId)
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
})

// Hook endpoint to send messages to all connected clients
events.post('/hook', async (c) => {
  try {
    const data = await c.req.json()

    // Send to all connected SSE clients
    const messageId = Date.now().toString()
    const deadConnections: string[] = []

    for (const [connectionId, connection] of sseConnections.entries()) {
      try {
        const messageData = `event: message\nid: ${messageId}\ndata: ${JSON.stringify(data)}\n\n`
        connection.controller.enqueue(new TextEncoder().encode(messageData))
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