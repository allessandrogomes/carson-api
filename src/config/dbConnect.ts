import mongoose from 'mongoose'

async function connectToDatabase() {
  try {
    if (process.env.MONGODB_URI) {
      mongoose.connect(process.env.MONGODB_URI)
      return mongoose.connection
    }
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados', error)
  }
}

export default connectToDatabase
