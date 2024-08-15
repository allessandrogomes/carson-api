import express from 'express'
import connectToDatabase from './config/dbConnect'
import routes from './routes/index'
const connectionAPI = await connectToDatabase()
if (connectionAPI) {
  connectionAPI.on('error', (error) => {
    console.error('Erro de conexão', error)
  })
  connectionAPI.once('open', () => {
    console.log('Conexão bem sucedida.')
  })
}
const app = express()
routes(app)
export default app
