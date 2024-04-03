import Position from "../models/User.js";

const controller = {}

import Order from "../models/order.js";
import errorHandler from "../utils/errorHandler.js";
import {Query} from "mongoose";

controller.getAll =  async function(req, res) {
    const query = {
        user: req.user.id
    }

    if (req.query.start) {
        query.date = {
            // Больше или равно
            $gte: req.query.start
        }
    }

    if (req.query.end) {
        if (!query.date) {
            query.date = {}
        }

        query.date['$lte'] = req.query.end
    }

    if (req.query.order) {
        query.order = +req.query.order
    }
    try {
        const order = await  Order.find()
            .find(query)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)
        res.status(200).json(order)
    } catch (e) {
        errorHandler(res, e);
    }
}

controller.create = async function (req, res) {
    try {
        const lastOrder = await Order.findOne({user: req.user.id}).sort({date: -1})
        const maxOrder = lastOrder ? lastOrder.order  : 0
        const order = await new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save()
        res.status(201).json(order)
    } catch (e) {
        errorHandler(res, e);
    }
}
export default controller;