import mongoose from 'mongoose'
declare const Advertisement: mongoose.Model<
  {
    model: string
    brand: string
    year: string
    color: string
    km: string
    image: string
    price: number
    createdAt: string
    userId?: mongoose.Types.ObjectId | null | undefined
  },
  {},
  {},
  {},
  mongoose.Document<
    unknown,
    {},
    {
      model: string
      brand: string
      year: string
      color: string
      km: string
      image: string
      price: number
      createdAt: string
      userId?: mongoose.Types.ObjectId | null | undefined
    }
  > & {
    model: string
    brand: string
    year: string
    color: string
    km: string
    image: string
    price: number
    createdAt: string
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
      model: string
      brand: string
      year: string
      color: string
      km: string
      image: string
      price: number
      createdAt: string
      userId?: mongoose.Types.ObjectId | null | undefined
    },
    mongoose.Document<
      unknown,
      {},
      mongoose.FlatRecord<{
        model: string
        brand: string
        year: string
        color: string
        km: string
        image: string
        price: number
        createdAt: string
        userId?: mongoose.Types.ObjectId | null | undefined
      }>
    > &
      mongoose.FlatRecord<{
        model: string
        brand: string
        year: string
        color: string
        km: string
        image: string
        price: number
        createdAt: string
        userId?: mongoose.Types.ObjectId | null | undefined
      }> & {
        _id: mongoose.Types.ObjectId
      }
  >
>
export default Advertisement
