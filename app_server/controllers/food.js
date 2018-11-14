var request = require('request');
var apiOptions = {
	server : "http://localhost:3000"
};

/*function to display home page with fridge items*/
var renderHomepage = function(req, res, responseBody){
	var message;
	if (!(responseBody instanceof Array)) {
		message = "API lookup error";
		responseBody = [];
	} else {
		if (!responseBody.length) {
			message = "No food left in fridge! Restock now!!";
		}
	}
	res.render('list', {
        title: 'Items in my Fridge',
        items: responseBody,
		message: message
    });
};

/*function that GETs all items from fridge and creates the data object for view*/
var homeListFunc = function(req, res) {
	var requestOptions, path = '/api/food';
		requestOptions = {
			url : apiOptions.server + path,
			method : "GET",
			json : {},
			qs : {}
	};
	request(requestOptions, function(err, response, body) {
		var i, data = body, displayData = [];
		if (response.statusCode === 200 && data.length) {
			for (var i=0; i < data.length; i++) {
				console.log("response date--", data[i]);
				displayData.push({
					date: data[i].date,
					name: data[i].name,
					quantity: data[i].quantity,
					leftOver: data[i].left_overs,
					id: data[i]._id
				});
				if(data[i].expiry != ""){
					displayData[i]["expiry"] = data[i].expiry;
				}
			}
		}else {
			renderHomepage(req, res, displayData);
		}
		renderHomepage(req, res, displayData);
	});
};

module.exports.homeList = homeListFunc;

/*function to add item in the database*/
module.exports.addItem = function(req, res) {
	console.log("req object-------" , req.body);
	var data = {}, err = false;
	if(req.body.name != ""){
		data.name = req.body.name;
	}else{
		err = true;
	}
	if(req.body.date != ""){
		data.date = req.body.date;
	}else{
		err = true;
	}
	if(req.body.edate != ""){
		data.expiry = req.body.edate;
	}
	data.quantity = req.body.quantity ? req.body.quantity : 1;
	data.left_overs = req.body.left_over;
	
	if(err){
		res.render('add-item', {
			msg: "Missing required fields Name/Date! Cannot add item to fridge!!"
		});
		return;
	}else{
		console.log("data obj------ " , data);
		var requestOptions, path = '/api/food';
		requestOptions = {
			url : apiOptions.server + path,
			method : "POST",
			json : data
		};
		request(requestOptions, function(err, response, body) {
			console.log("add item response.statusCode-----" +response.statusCode);
			if(response.statusCode == 201){
				console.log("Success");
				homeListFunc(req, res);
			}else if(err){
				console.log("Error:", err);
				res.render('add-item', {
					msg: "Error While Saving to Database. Try again later."
				});
			}
			
		});
	}
};

/*function to delete item from database*/
module.exports.deleteItem = function(req, res) {
	console.log("delete req.params.foodId" + req.params.foodId);
	var requestOptions, path = '/api/food';
	requestOptions = {
		url : apiOptions.server + path + '/' + req.params.foodId,
		method : "DELETE"
	};
	request(requestOptions, function(err, response, body) {
		if(response.statusCode == 200 || response.statusCode == 204){
			console.log("Delete Success");
			homeListFunc(req, res);
			return;
		}else{
			alert("Error while deleting, Check your Fridge database");
			homeListFunc(req, res);
			return;
		}
	});
};