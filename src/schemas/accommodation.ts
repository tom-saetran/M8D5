import mongoose from "mongoose"

const { Schema, model } = mongoose

const accommodationSchema = new Schema(
    {
        name: { type: String, required: true, allowNull: false },
        description: { type: String, required: true, allowNull: false },
        location: { type: Schema.Types.ObjectId, ref: "Location", required: true, allowNull: false },
        // location: { type: String, required: true },
        maxGuests: { type: Number, required: true, allowNull: false }
    },
    { timestamps: true }
)

export default model("Accomodation", accommodationSchema)
