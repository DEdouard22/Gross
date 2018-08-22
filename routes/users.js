var express = require('express');
var router = express.Router();
const models = require('../server/models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.user.id)
  models.User.findOne({
      where: {id: req.user.id},
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

// router.put('/:id', ( req, res, next ) => {
//   console.log(req);
//   models.Transaction.findById (req.params.id)
//   .then(transactions => {
//       transactions.update(req.body)
//       .then((transaction) => {
//           res.json(transactions);
//       })
//       .catch(next)
//   })
// })

router.put('/savegoal/:id', ( req, res, next ) => {
  console.log(req);
  models.User.findById(req.params.id)
  .then(user => {
      user.update({
        saveGoal: req.body.saveGoal
      })
      .then((user) => {
          res.json(user);
      })
      .catch(next)
  })
})

module.exports = router;
