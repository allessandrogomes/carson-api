import mongoose from 'mongoose'
declare const PersonalData: mongoose.Model<
  {
    name: string
    surname: string
    dateOfBirth: string
    city: string
    street: string
    houseNumber: string
    userId?: mongoose.Types.ObjectId | null | undefined
    phoneNumber?: string | null | undefined
    cep?: string | null | undefined
    state?: string | null | undefined
  },
  {},
  {},
  {},
  mongoose.Document<
    unknown,
    {},
    {
      name: string
      surname: string
      dateOfBirth: string
      city: string
      street: string
      houseNumber: string
      userId?: mongoose.Types.ObjectId | null | undefined
      phoneNumber?: string | null | undefined
      cep?: string | null | undefined
      state?: string | null | undefined
    }
  > & {
    name: string
    surname: string
    dateOfBirth: string
    city: string
    street: string
    houseNumber: string
    userId?: mongoose.Types.ObjectId | null | undefined
    phoneNumber?: string | null | undefined
    cep?: string | null | undefined
    state?: string | null | undefined
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
      name: string
      surname: string
      dateOfBirth: string
      city: string
      street: string
      houseNumber: string
      userId?: mongoose.Types.ObjectId | null | undefined
      phoneNumber?: string | null | undefined
      cep?: string | null | undefined
      state?: string | null | undefined
    },
    mongoose.Document<
      unknown,
      {},
      mongoose.FlatRecord<{
        name: string
        surname: string
        dateOfBirth: string
        city: string
        street: string
        houseNumber: string
        userId?: mongoose.Types.ObjectId | null | undefined
        phoneNumber?: string | null | undefined
        cep?: string | null | undefined
        state?: string | null | undefined
      }>
    > &
      mongoose.FlatRecord<{
        name: string
        surname: string
        dateOfBirth: string
        city: string
        street: string
        houseNumber: string
        userId?: mongoose.Types.ObjectId | null | undefined
        phoneNumber?: string | null | undefined
        cep?: string | null | undefined
        state?: string | null | undefined
      }> & {
        _id: mongoose.Types.ObjectId
      }
  >
>
export default PersonalData
