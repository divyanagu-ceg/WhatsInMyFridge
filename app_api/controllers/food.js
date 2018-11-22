var mongoose = require('mongoose');
var Fridge = mongoose.model('dnFridge');

//for GET requests
var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

/*to get all items from database*/
module.exports.foodItemList = function(req, res) {
	console.log("Listing all food items:");
	Fridge.find({})
	.exec(function(err, itemList){
		if (!itemList) {
			sendJsonResponse(res, 404, {
				"message": "No items in fridge!"
			});
			return;
		}else{
			sendJsonResponse(res, 200, itemList);
		}
	});
}; 

/* GET request for one  food item */
module.exports.foodInfo = function(req, res) {
	console.log("req.params.foodId: " + req.params.foodId);
	if (req.params && req.params.foodId) {
	Fridge
		.findById(req.params.foodId)
		.exec(function(err, foodItem) {
		if (!foodItem) {
			sendJsonResponse(res, 404, {
				"message": "Food Item not found!"
			});
			return;
		} else if (err) {
			if(req.params.foodId == ""){
				sendJsonResponse(res, 400, {"message": "No food id in request!!"});
			}else{
				console.log("Error");
				sendJsonResponse(res, 404, err);
			}
			return;
		}
		sendJsonResponse(res, 200, foodItem);
		});
	} else {
		console.log("No food Id in request");
		sendJsonResponse(res, 404, {
			"message": "No food item name in request!"
		});
	}
};

/* POST for create food item */
module.exports.foodItemCreate = function(req, res) {
	console.log("Create----", req.body);
	Fridge.create(req.body, function(err, foodItem) {
		if (err) {
			console.log("Error while saving:", err);
			sendJsonResponse(res, 400, err);
		} else {
			res.header({
				Location: req.protocol + '://' + req.get('host') + '/api/food/' +  foodItem._id                       
			});
			sendJsonResponse(res, 201, foodItem);
		}
	});
};

/*function to reduce quantity by 1 and/or delete from database*/
module.exports.foodItemDelete = function(req, res) {
	var foodId = req.params.foodId;
	console.log("Delete---",req.params.foodId);
	if (foodId) {
		Fridge
		.findById(foodId)
		.exec(
			function (err, foodItem) {
			console.log("Item found for id:", foodItem);
				if(foodItem.quantity > 1){
					foodItem.quantity -= 1;
					console.log("foodItem.quantity", foodItem.quantity);
					foodItem.save(function(err, foodItem) {
						console.log("In save: " + foodItem);
						if (err) {
							console.log("In save Error: " + err);
							sendJsonResponse(res, 404, err);
						} else {
							sendJsonResponse(res, 200, foodItem);
						}
					});
					//sendJsonResponse(res, 204, null);
				}else if(foodItem.quantity == 1){
					console.log("Item to be deleted:");
					Fridge.remove({"_id": foodItem._id}, function(err, foodItem){
						if(err){
							console.log("Delete Error in API:", err);
							sendJsonResponse(res, 404, err);
							return;
						}
						console.log("Delete Success in API:");
						sendJsonResponse(res, 204, null);
					});
				}
			}
		);
	} else {
		sendJsonResponse(res, 404, {
			"message": "No food Item found"
		});
	}
};

