import mongoose from 'mongoose'
async function connectToDatabase() {
  try {
    if (process.env.DB_CONNECTION_STRING) {
      mongoose.connect(process.env.DB_CONNECTION_STRING)
      return mongoose.connection
    }
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados', error)
  }
}
export default connectToDatabase
