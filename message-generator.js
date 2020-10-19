const WebSocket = require('ws')
const random = require('random')
const text = require('./text.js')
const ws = new WebSocket('ws://localhost:4001')

ws.on('open', function open() {
  setInterval(() => {
    const splitedText = text.split(' ')
    const newMessage = {
      id: Date.now(),
      text: splitedText[random.int(0, splitedText.length)],
      playerId: random.int((min = 0), (max = 10)),
      date: Date.now(),
    }

    ws.send(JSON.stringify(newMessage))

  }, 1000)
})
