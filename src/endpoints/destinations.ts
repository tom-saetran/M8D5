import express from "express"
import { isValidObjectId } from "mongoose"
import LocationModel from "../schemas/location"
import createError from "http-errors"
import console from "console"

const destinationsRoute = express.Router()

destinationsRoute.get("/", async (req, res, next) => {
    try {
        const response = await LocationModel.find()
        res.send(response)
    } catch (error) {
        next(createError(500, error))
    }
})

destinationsRoute.post("/", async (req, res, next) => {
    try {
        const result = new LocationModel(req.body)
        console.log(result)
        if (await result.save()) res.status(201).send(result)
        else next(createError(400, "Error saving data!"))
    } catch (error) {
        next(createError(400, error))
    }
})

destinationsRoute.get("/:id", async (req, res, next) => {
    try {
        let result
        if (!isValidObjectId(req.params.id)) next(createError(400, `ID ${req.params.id} is invalid`))
        else result = await LocationModel.findById(req.params.id)

        if (!result) next(createError(404, `ID ${req.params.id} was not found`))
        else res.status(200).send(result)
    } catch (error) {
        console.log(error)
        next(error.message)
    }
})

destinationsRoute.put("/:id", async (req, res, next) => {
    try {
        let result
        if (!isValidObjectId(req.params.id)) next(createError(400, `ID ${req.params.id} is invalid`))
        else
            result = await LocationModel.findByIdAndUpdate(
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

destinationsRoute.delete("/:id", async (req, res, next) => {
    try {
        let result
        if (!isValidObjectId(req.params.id)) next(createError(400, `ID ${req.params.id} is invalid`))
        else result = await LocationModel.findByIdAndDelete(req.params.id)

        if (result) res.status(204).send("Deleted")
        else next(createError(404, `ID ${req.params.id} was not found`))
    } catch (error) {
        next(error)
    }
})

export default destinationsRoute
