import { ref, onUnmounted } from 'vue'

export function useSSE(endpoint: string = '/api/events/stream') {
  let eventSource: EventSource | null = null
  let reconnectTimeout: number | null = null
  const connectionStatus = ref<'disconnected' | 'connecting' | 'connected'>('disconnected')
  const messages = ref<any[]>([])
  const latestMessage = ref<any>(null)

  const connect = () => {
    if (eventSource) {
      eventSource.close()
    }

    connectionStatus.value = 'connecting'
    console.log('Connecting to SSE...')

    // DEV-mode backend url
    const sseUrl = import.meta.env.DEV
      ? `http://localhost:3000${endpoint}`
      : endpoint

    console.log('SSE URL:', sseUrl)
    eventSource = new EventSource(sseUrl)

    eventSource.onopen = () => {
      connectionStatus.value = 'connected'
      console.log('SSE Connected')
    }

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        console.log('SSE Message:', data)
      } catch (error) {
        console.log('SSE Message (raw):', event.data)
      }
    }

    eventSource.addEventListener('connection', (event) => {
      try {
        const data = JSON.parse(event.data)
        console.log('SSE Connection event:', data)
      } catch (error) {
        console.log('SSE Connection event (raw):', event.data)
      }
    })

    eventSource.addEventListener('heartbeat', (event) => {
      try {
        const data = JSON.parse(event.data)
        console.log('SSE Heartbeat:', data)
      } catch (error) {
        console.log('SSE Heartbeat (raw):', event.data)
      }
    })

    eventSource.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data)
        console.log('SSE Custom Message:', data)

        // Store message data
        messages.value.push(data)
        latestMessage.value = data

        // Keep only last 100 messages to prevent memory issues
        if (messages.value.length > 100) {
          messages.value = messages.value.slice(-100)
        }
      } catch (error) {
        console.log('SSE Custom Message (raw):', event.data)

        // Store raw message if JSON parsing fails
        const rawData = { raw: event.data, timestamp: new Date().toISOString() }
        messages.value.push(rawData)
        latestMessage.value = rawData
      }
    })

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error)
      console.error('SSE ReadyState:', eventSource?.readyState)
      console.error('SSE URL:', eventSource?.url)

      if (eventSource?.readyState === EventSource.CLOSED) {
        console.log('SSE connection was closed by server')
      }

      connectionStatus.value = 'disconnected'

      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout)
      }

      reconnectTimeout = setTimeout(() => {
        if (connectionStatus.value === 'disconnected') {
          console.log('Attempting to reconnect SSE...')
          connect()
        }
      }, 3000)
    }
  }

  const disconnect = () => {
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout)
      reconnectTimeout = null
    }

    if (eventSource) {
      eventSource.close()
      eventSource = null
      connectionStatus.value = 'disconnected'
      console.log('SSE Disconnected')
    }
  }

  onUnmounted(() => {
    disconnect()
  })

  return {
    connectionStatus,
    messages,
    latestMessage,
    connect,
    disconnect
  }
}
