const express = require('express');
const router = express.Router();
const models = require('../server/models');
import dateFns, { eachDay } from "date-fns"; // will be used to get current date

/* GET expenses listing. */
router.get('/', function(req, res, next) {
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
    if (!req.body.recurring){
        models.Transaction.create({
            description: req.body.description,
            scheduledDay: req.body.scheduledDay,
            amount: req.body.amount,
            frequency: req.body.frequency,
            incomeDebt: req.body.incomeDebt,
            UserId: req.user.id,
            recurring: req.body.recurring
        })
    
        .then(transactions => {
            res.redirect('/api/expenses');
        })
    }
    else {
        if (req.frequency == "Monthly") {
            console.log('Monthly frequency selected');
            
        }
        else if (req.frequency == "Bi-Monthly"){
            console.log('Bi-Monthly frequency selected');
        }
        else if (req.frequency == "Bi-Weekly") {
            console.log('Bi-weekly frequency selected');
        }
        else if (req.frequency == "Weekly") {
            console.log('Weekly frequency selected');
        }
        else {
            console.log("no valid frequency selected");
        }
    }
})

router.put('/:id', ( req, res, next ) => {
    console.log(req);
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