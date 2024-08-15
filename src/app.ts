import express from 'express'
import connectToDatabase from './config/dbConnect'
import routes from './routes/index'

const app = express()

try {
  const connectionAPI = await connectToDatabase()

  if (connectionAPI) {
    connectionAPI.on('error', (error: Error) => {
      console.error('Erro de conexão', error)
    })

    connectionAPI.once('open', () => {
      console.log('Conexão bem sucedida.')
    })
  } else {
    console.error(
      'Falha na conexão com o banco de dados. Verifique as configurações e tente novamente.',
    )
    process.exit(1) // Encerra o processo se a conexão falhar
  }
} catch (error) {
  console.error('Erro ao conectar ao banco de dados:', error)
  process.exit(1) // Encerra o processo se ocorrer um erro
}

routes(app)

export default app
