import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import errorHandler from "../utils/errorHandler.js"

const controller = {};

controller.login = async function (req, res) {
    const candidate = await User.findOne({
        email: req.body.email
    });

    if (candidate) {
        // Пользователь существует, проверка пароля
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if (passwordResult) {
            // Генерация токена, пароли совпали
             const token = jwt.sign({
                 email: candidate.email,
                 userId: candidate._id
             }, process.env.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            // Пароли не совпали
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова.'
            })
        }
    } else {
        // пользователя нет, ошибка!
        res.status(404).json({
            message: 'Пользователь с таким email не найден.'
        })
    }
}


controller.register = async function (req, res) {
    const candidate = await User.findOne({
        email: req.body.email
    });
    if (candidate) {
        res.status(409).json({
            message: 'email уже занят!'
        })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            // Обработать ошибку
            errorHandler(res, e);
        }
    }
}

export default controller;