import Category from "../models/Category.js"
import errorHandler from "../utils/errorHandler.js"
import Position from "../models/Position.js"

const controller = {}
controller.getAll = async function (req, res) {
    // res.status(200).json({
    //     login: 'getAll'
    // });
    try {
        const categories = await Category.find({user: req.user.id})
        res.status(200).json(categories)
    } catch (e) {
        errorHandler(res, e)
    }
}

controller.getById = async function (req, res) {
    try {
        const categories = await Category.findById(req.params.id)
        res.status(200).json(categories);
    } catch (e) {
        errorHandler(res, e)
    }
}

controller.remove = async function (req, res) {
    try {
        await Category.remove({_id: req.params.id})
        await Position.remove({category: req.params.id})
        res.status(200).json({
            message: "Категория удалена."
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

controller.create = async function (req, res) {
    const category = new Category({
        name: req.body.name,
        user: req.user.id,
        imageSrc: req.file ? req.file.path : ''
    })
    try {
        await category.save()
        res.status(201).json(category)
    } catch (e) {
        errorHandler(res, e)
    }
}

controller.update = function (req, res) {

}
export default controller
