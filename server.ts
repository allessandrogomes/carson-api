import 'dotenv/config'
import app from './src/app.js'
import https from 'https'
import fs from 'fs'

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
}

const PORT = process.env.PORT || 3001

https.createServer(options, app).listen(PORT, () => {
  console.log('API rodando na porta https://localhost:3001')
})
