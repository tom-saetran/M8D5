import express from "express"
import { isValidObjectId } from "mongoose"
import AccommodationModel from "../schemas/accommodation"
import createError from "http-errors"

const accommodationRoute = express.Router()

accommodationRoute.get("/", async (req, res, next) => {
    try {
        const response = await AccommodationModel.find()
        res.send(response)
    } catch (error) {
        next(createError(500, error))
    }
})

accommodationRoute.post("/", async (req, res, next) => {
    try {
        const result = new AccommodationModel(req.body)

        if (await result.save()) res.status(201).send(result._id)
        else next(createError(400, "Error saving data!"))
    } catch (error) {
        next(error)
    }
})

accommodationRoute.get("/:id", async (req, res, next) => {
    try {
        let result
        if (!isValidObjectId(req.params.id)) next(createError(400, `ID ${req.params.id} is invalid`))
        else result = await AccommodationModel.findById(req.params.id)

        if (!result) next(createError(404, `ID ${req.params.id} was not found`))
        else res.status(200).send(result)
    } catch (error) {
        console.log(error)
        next(error.message)
    }
})

accommodationRoute.put("/:id", async (req, res, next) => {
    try {
        let result
        if (!isValidObjectId(req.params.id)) next(createError(400, `ID ${req.params.id} is invalid`))
        else
            result = await AccommodationModel.findByIdAndUpdate(
                req.params.id,
                { ...req.body, updatedAt: new Date() },
                { runValidators: true, new: true, useFindAndModify: false }
            )

        if (result) res.status(200).send(result)
        else next(createError(404, `ID ${req.params.id} was not found`))
    } catch (error) {
        next(error)
    }
})

accommodationRoute.delete("/:id", async (req, res, next) => {
    try {
        let result
        if (!isValidObjectId(req.params.id)) next(createError(400, `ID ${req.params.id} is invalid`))
        else result = await AccommodationModel.findByIdAndDelete(req.params.id)

        if (result) res.status(204).send("Deleted")
        else next(createError(404, `ID ${req.params.id} was not found`))
    } catch (error) {
        next(error)
    }
})

export default accommodationRoute
