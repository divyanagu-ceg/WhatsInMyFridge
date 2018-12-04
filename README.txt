Divya Nagarajan - 8240467

A very simple web application that allows you track the contents of your fridge - using Node, Angular 4 and MongoDB.

TO ADD ENTRY TO FRIDGE DATABASE:

1. API

POST : http://localhost:3000/api/food
Header: Content-Type:application/json
Body: {
	"name": "Bread",
 "date": "2018-03-29",
	"quantity": 6,
 "left_overs": "true"
}


2. Via UI - requires mongoDB to be installed in system
Simply use the add item menu button to add items to the fridge

GIT REPO:
https://github.com/divyanagu-ceg/WhatsInMyFridge

1. The "My food" menu displays all the items in the fridge with the ability to reduce the quantity and/or delete the item.
2. The "Add Food" page displays a form to add a new item to the fridge.
3. The "Update Fridge" page allows you to edit the items in the fridge.

