import mongoose from 'mongoose'
const accessDataSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  { versionKey: false },
)
const AccessData = mongoose.model(
  'AccessData',
  accessDataSchema,
  'usersAccessData',
)
export default AccessData
