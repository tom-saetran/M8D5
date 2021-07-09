import mongoose from "mongoose"

const { Schema, model } = mongoose

const accommodationSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
        maxGuests: { type: Number, required: true }
    },
    { timestamps: true }
)

export default model("Accomodation", accommodationSchema)
