var express = require('express');
var router = express.Router();
const models = require('../server/models');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  console.log(req.params)
  models.User.findOne({
      where: {id: req.params.id},
      include: [ models.Transaction ]
    })
      
    // where: {id: req.params.id}
    // include: [
    //       models.Transaction
  .then(user => {
    // models.Transaction.findOne({
    //   where: {id: user.id}
    // })
    // .then(transaction => {
    //   res.send({transaction: transaction, user: user})
    // })
    console.log(user)
    res.send(user)
  })
  .catch(err => {
    res.send(err)
  })
});

module.exports = router;
