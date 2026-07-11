const express = require('express');
const router = express.Router();

/*
Mock database
item format = {
    id: string,
    name: string,
    address: string,
}
*/
const items = [];

// GET /api/resources
// Returns full mock DB
router.get('/', (req, res) => {
    res.status(200).json(items);
})

// GET /api/resources/{id}
// Returns item from the mock DB with matching id if it exists
router.get('/:id', (req, res) => {
    res.status(200).json(match);
})

// POST /api/resources
// Adds new item to db
router.post('/', (req, res) => {
    if(req.body && req.body.name && req.body.address){
        items.push({
            id: Date.now().toString(),
            name: req.body.name,
            address: req.body.address
        })
        res.status(201).json(items.at(-1));
    } else {
        const err = 'Error 400: Data payload is invalid. It must be in JSON format and contain the fields "name" and "address".';
        console.log('\n' + err);
        res.status(400).json({message: err});
    }
})

// PUT /api/resources/{id}
// Changes parameters of specified element
router.put('/:id', (req, res) => {
    // Checks for valid data parameters
    if(req.body && (req.body.name || req.body.address)){
        // Message to be sent to the response on successful update of the data
        const msg = { before: {
            id: req.item.id,
            name: req.item.name,
            address: req.item.address
        } }
        if(req.body.name) req.item.name = req.body.name;
        if(req.body.address) req.item.address = req.body.address;
        msg.after = req.item
        res.status(200).json(msg);
    } else {
        const err = 'Error 400: Data payload is invalid. It must be in JSON format and contain at least one of the fields "name" or "address".';
        console.log('\n' + err);
        res.status(400).json({message: err});
    }
})

// DELETE /api/resource/{id}
// Deletes the item with the given id from the mock DB
router.delete('/:id', (req, res) => {
    items.splice(items.indexOf(req.item), 1);
    res.status(200).json({message: `Deletion of item with id = ${req.params.id} successful`})
})

// Middleware function that uses the id parameter to find the matching item in the mock DB
router.param('id', (req, res, next, id) => {
    match = items.find(item => item.id === req.params.id);
    if(match){
        req.item = match;
        next();
    } else {
        const err = `Error 404: Item with ID = ${id} not found`;
        console.log('\n' + err);
        res.status(404).json({message: err});
        next();
    }
    
})

module.exports = router;