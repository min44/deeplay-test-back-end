const WebSocket = require('ws')
const wsserver = new WebSocket.Server({ port: 4001 })
const http = require('http')

function saveToJson(newMessage) {
  const data = newMessage
  const options = {
    protocol: 'http:',
    hostname: 'localhost',
    port: 4000,
    path: '/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  }

  const req = http
    .request(options, (res) => {})
    .on('error', (err) => {
      console.log('Error: ', err.message)
    })
  req.write(newMessage)
  req.end()
}

wsserver.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(JSON.parse(message))
    saveToJson(message)
    wsserver.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    })
  })

  ws.send(JSON.stringify('Server is online'))
  ws.on('close', (event) => {
    console.log('Client left')
  })
  
  ws.on('open', (event) => {
    console.log('New client conected')
  })
})
