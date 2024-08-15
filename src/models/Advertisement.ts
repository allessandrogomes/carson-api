import mongoose from 'mongoose'

const advertisementSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    color: { type: String, required: true },
    km: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: String, required: true },
  },
  { versionKey: false },
)

const Advertisement = mongoose.model(
  'Advertisement',
  advertisementSchema,
  'advertisements',
)

export default Advertisement
