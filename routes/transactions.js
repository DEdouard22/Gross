const express = require('express');
const router = express.Router();
const models = require('../server/models');

/* GET expenses listing. */
router.get('/', function(req, res, next) {
    models.Transaction.findAll({
        // where: {
        //     UserId: 1
        // },
        // include: [a
        //     models.User,
        //     models.Paymentmethod
        // ],
    })

    .then(transactions => {
        res.send(transactions);
    })
});

router.post('/', function(req, res) {
    models.Transaction.create({
        description: req.body.description,
        amount: req.body.amount,
        frequency: req.body.frequency,
        incomeDebt: req.body.incomeDebt
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

router.get('/delete/:id', function( req, res, next) {
    const id = req.params.id;
    models.Transaction.destroy({
        where: {id: id}
    })
    .then(transactions => {
        res.redirect('/api/expenses');
    })
})

module.exports = router;