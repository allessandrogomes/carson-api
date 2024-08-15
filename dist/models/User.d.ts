import mongoose from 'mongoose'
declare const User: mongoose.Model<
  {
    advertisements: mongoose.Types.ObjectId[]
    personalDataId?: mongoose.Types.ObjectId | null | undefined
    accessDataId?: mongoose.Types.ObjectId | null | undefined
  },
  {},
  {},
  {},
  mongoose.Document<
    unknown,
    {},
    {
      advertisements: mongoose.Types.ObjectId[]
      personalDataId?: mongoose.Types.ObjectId | null | undefined
      accessDataId?: mongoose.Types.ObjectId | null | undefined
    }
  > & {
    advertisements: mongoose.Types.ObjectId[]
    personalDataId?: mongoose.Types.ObjectId | null | undefined
    accessDataId?: mongoose.Types.ObjectId | null | undefined
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
      advertisements: mongoose.Types.ObjectId[]
      personalDataId?: mongoose.Types.ObjectId | null | undefined
      accessDataId?: mongoose.Types.ObjectId | null | undefined
    },
    mongoose.Document<
      unknown,
      {},
      mongoose.FlatRecord<{
        advertisements: mongoose.Types.ObjectId[]
        personalDataId?: mongoose.Types.ObjectId | null | undefined
        accessDataId?: mongoose.Types.ObjectId | null | undefined
      }>
    > &
      mongoose.FlatRecord<{
        advertisements: mongoose.Types.ObjectId[]
        personalDataId?: mongoose.Types.ObjectId | null | undefined
        accessDataId?: mongoose.Types.ObjectId | null | undefined
      }> & {
        _id: mongoose.Types.ObjectId
      }
  >
>
export default User
