import mongoose from 'mongoose'
const userSchema = new mongoose.Schema(
  {
    personalDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PersonalData',
    },
    accessDataId: { type: mongoose.Schema.Types.ObjectId, ref: 'AccessData' },
    advertisements: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Advertisement' },
    ],
  },
  { versionKey: false },
)
const User = mongoose.model('User', userSchema, 'users')
export default User
