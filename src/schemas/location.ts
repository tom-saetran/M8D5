import mongoose from "mongoose"
const { Schema, model } = mongoose
const locationSchema = new Schema({ city: { type: String, required: true } }, { timestamps: true })
export default model("Location", locationSchema)
