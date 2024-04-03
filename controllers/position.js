import Position from "../models/User.js"
import errorHandler from "../utils/errorHandler.js"

const controller = {}
controller.getByCategoryId = async function (req, res) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        })
        res.status(201).json(positions);
    } catch (e) {
        errorHandler(res, e);
    }
}

controller.create = async function (req, res) {
    try {
        const positions = await new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.user.id
        }).save()
        res.status(200).json(positions);
    } catch (e) {
        errorHandler(res, e);
    }
}

controller.update = async function (req, res) {
    try {
        await Position.remove({id: req.params.id})
        res.status(200).json({
            message: 'Позиция была удалена.'
        })
    } catch (e) {
        errorHandler(res, e);
    }
}

controller.remove = async function (req, res) {
    try {
        const position = await Position.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(position);
    } catch (e) {
        errorHandler(res, e);
    }
}
export default controller;
