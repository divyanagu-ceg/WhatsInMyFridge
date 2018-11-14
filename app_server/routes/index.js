var express = require('express');
var router = express.Router();
var foodItems = require('../controllers/food');
console.log(JSON.stringify(foodItems))
/* GET home page. */
router.get('/', foodItems.homeList);

/* GET all items page. */
router.get('/list', foodItems.homeList);

/* GET add item page. */
router.get('/add-item', function(req, res, next) {
  res.render('add-item', {});
});


router.post('/food', foodItems.addItem);

/* GET delete page. */
router.get('/delete/:foodId', foodItems.deleteItem);


module.exports = router;
