const express = require('express');
const pool = require('../modules/pool.js');

const router = express.Router();


// GET /groceries --- returns all items
router.get ('/', (req,res) => {
    console.log ("GET all items route");
    console.log (req.body)
})
// GET /groceries/:id --- returns single item by ID

// POST /groceries --- adds a new item to the list

// DELETE /groceries/:id --- removes an item from the list

// PUT /groceries/:id --- updates an item on the list. 


module.exports = router;
