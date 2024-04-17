const express = require('express');
const pool = require('../modules/pool.js');

const router = express.Router();


// GET /groceries --- returns all items
router.get ('/', (req,res) => {
    console.log ("GET all items route");
    console.log (req.body);
    const sqlText = `SELECT * from "groceries"`
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log ("Error retreiving grocery list. Error text: ", error)
            res.sendStatus(500);
        })
})

// POST /groceries --- adds a new item to the list
router.post('/', (req, res) =>{
    console.log ("POST new item");
    console.log(req.body);
    const sqlText = `
        INSERT INTO "groceries"
            ("item", "quantity", "unit_price", "in_cart")
            VALUES
            ($1, $2, $3, $4)
    `;
    let sqlValues = [req.body.item, req.body.quantity, req.body.unit_price, req.body.in_cart];
    pool.query(sqlText, sqlValues)
        .then(() => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log ("Error adding grocery item. Error: ", error);
        })

})

// DELETE /groceries/:id --- removes an item from the list
router.delete('/:id',(req, res) => {
    console.log("DELETE item route");
    console.log(req.params.id);
    const sqlText = `
        DELETE FROM "groceries"
        WHERE id =$1
    `;
    let sqlValues = [req.params.id];
    pool.query(sqlText, sqlValues)
        .then ((response) => {
            console.log("Item Deleted.")
            res.sendStatus(200);
        })
        .catch ((error) => {
            console.log("Error deleting item. Error: ", error)
            res.sendStatus(500);
        })
})

// PUT /groceries/:id --- updates an item on the list. 
router.put('/:id', (req, res) => {
    console.log("PUT route to update items");
    console.log(req.params.id, req.body);
    const sqlText = `
        UPDATE "groceries"
        SET "item" = $1, "quantity" = $2, "unit_price" = $3, "in_cart" = $4
        WHERE "id" = $5
    `;
    let sqlValues = [req.body.item, req.body.quantity, req.body.unit_price, req.body.in_cart, req.params.id];
    pool.query(sqlText, sqlValues)
        .then ((response) => {
            console.log("Item Updated.")
            res.sendStatus(200);
        })
        .catch ((error) => {
            console.log("Error updating item. Error: ", error)
            res.sendStatus(500);
        })
})    



module.exports = router;
