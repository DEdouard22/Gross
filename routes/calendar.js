var express = require('express');
var router = express.Router();
const models = require('../server/models');

router.get('/', (req, res, next) => {    
    console.log(req.user.id);
    models.User.findById(req.user.id, {
        include: [
            models.Transaction
        ]
    }).then(user => {
        res.send(user);
    });
});

module.exports = router;

//req.user.id
// if req.user.id doesn't exit, then