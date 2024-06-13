import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    idUser: { type: String, required: true },
    nameUser: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    color: { type: String, required: true },
    km: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true }
}, { versionKey: false });

const advertisement = mongoose.model("advertisements", advertisementSchema);

export default advertisement