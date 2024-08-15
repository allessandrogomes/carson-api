import mongoose from 'mongoose'
declare function connectToDatabase(): Promise<mongoose.Connection | undefined>
export default connectToDatabase
