const express = require('express');
const router = express.Router();
const models = require('../server/models');

/* GET expenses listing. */
router.get('/', function(req, res, next) {
    console.log(req.user.id)
    models.Transaction.findAll({
        where: {
            UserId: req.user.id
        },
        include: [
            models.User
        ],
    })

    .then(transactions => {
        res.send(transactions);
    })
});

router.post('/', function(req, res) {
    console.log(req.user);
    models.Transaction.create({
        description: req.body.description,
        scheduledDay: req.body.date,
        amount: req.body.amount,
        frequency: req.body.frequency,
        incomeDebt: req.body.incomeDebt,
        UserId: req.user.id
    })
    .then(transactions => {
        res.redirect('/api/expenses');
    })
})

router.put('/:id', ( req, res, next ) => {
    models.Transaction.findById (req.params.id)
    .then(transactions => {
        transactions.update(req.body)
        .then((transaction) => {
            res.json(transactions);
        })
        .catch(next)
    })
})

router.delete('/:id', function( req, res, next) {
    const id = req.params.id;
    models.Transaction.destroy({
        where: {
            id: id}
    })
    .then(transactions => {
        res.json('OK')
    })
})

module.exports = router;