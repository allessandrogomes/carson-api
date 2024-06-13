import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    phoneNumber: { type: String },
    advertisements: []
}, { versionKey: false });

const user = mongoose.model("users", userSchema);

export default user;