const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()


server.use(bodyParser.json())
server.use(middlewares)
server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})