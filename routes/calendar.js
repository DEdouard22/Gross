var express = require('express');
var router = express.Router();
const models = require('../server/models');

router.get('/', function(req, res, next) {
    models.User.findById(req.params.id, {
        include: [
            models.Transaction
        ]
    }). then (user => {
        res.send(user);
    });
});

module.exports = router;