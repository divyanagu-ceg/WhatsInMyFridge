var express = require('express');
var router = express.Router();
var ctrlFood = require('../controllers/food');

//get all items
router.get('/food', ctrlFood.foodItemList);

//get one item
router.get('/food/:foodId', ctrlFood.foodInfo);

//save item
router.post('/food', ctrlFood.foodItemCreate);

//delete item
router.delete('/food/:foodId', ctrlFood.foodItemDelete);

//update item
router.put('/food/:foodId', ctrlFood.foodItemUpdate);


module.exports = router;
