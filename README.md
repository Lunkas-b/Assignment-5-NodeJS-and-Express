# Description
Educational Node.js/Express program that has the proper routes and fetch methods to perform basic database operations to a local JSON array serving as a mock database.

These methods include:
- GET /api/resources - Returns the full mock DB
- GET /api/resources/{id} - Returns the DB item that matches the id in the parameters
- POST /api/resources - Adds a new item to the mock DB, takes a json object with the following format: { name: String, address: String }
- PUT /api/resources/{id} - Modifys the elements of the specified item in the mock DB, takes a json object that must have one of the following: { name: String, address: String }.
- DELETE /api/resources/{id} - Deletes the specified item in the mock DB

# Postman Testing
