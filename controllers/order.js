const controller = {}

import Order from "../models/order.js";

controller.getAll = function(req, res) {
    Order.find()
        .exec()
        .then((docs) => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
}

controller.create = function (req, res) {

}
export default controller;