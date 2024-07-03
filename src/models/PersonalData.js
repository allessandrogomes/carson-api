import mongoose from "mongoose";

const personalDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    phoneNumber: { type: String },
    cep: { type: String },
    state: { type: String },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: String, required: true }
}, { versionKey: false });

const PersonalData = mongoose.model("PersonalData", personalDataSchema, "usersPersonalData");

export default PersonalData;