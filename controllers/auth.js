const controller = {}
controller.login = function (req, res) {
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    });
}

controller.register = function (req, res) {
    res.status(200).json({
        register: 'OK'
    })
}
export default controller;