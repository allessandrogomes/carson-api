import mongoose from 'mongoose'
declare const AccessData: mongoose.Model<
  {
    email: string
    passwordHash: string
    userId?: mongoose.Types.ObjectId | null | undefined
  },
  {},
  {},
  {},
  mongoose.Document<
    unknown,
    {},
    {
      email: string
      passwordHash: string
      userId?: mongoose.Types.ObjectId | null | undefined
    }
  > & {
    email: string
    passwordHash: string
    userId?: mongoose.Types.ObjectId | null | undefined
  } & {
    _id: mongoose.Types.ObjectId
  },
  mongoose.Schema<
    any,
    mongoose.Model<any, any, any, any, any, any>,
    {},
    {},
    {},
    {},
    {
      versionKey: false
    },
    {
      email: string
      passwordHash: string
      userId?: mongoose.Types.ObjectId | null | undefined
    },
    mongoose.Document<
      unknown,
      {},
      mongoose.FlatRecord<{
        email: string
        passwordHash: string
        userId?: mongoose.Types.ObjectId | null | undefined
      }>
    > &
      mongoose.FlatRecord<{
        email: string
        passwordHash: string
        userId?: mongoose.Types.ObjectId | null | undefined
      }> & {
        _id: mongoose.Types.ObjectId
      }
  >
>
export default AccessData
