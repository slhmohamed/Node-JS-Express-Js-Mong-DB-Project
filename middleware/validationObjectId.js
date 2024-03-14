const mongoose = require('mongoose')

module.exports = (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.accountId)) {
        res.status(400).send('Invalid params')
    }
    next();
}