var express = require('express');
var router = express.Router();
const models = require('../server/models');

<<<<<<< HEAD
router.get('/', function(req, res, next) {
=======
router.get('/', (req, res, next) => {    
    console.log(req.user.id);
>>>>>>> master
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