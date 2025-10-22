const express = require('express')
const router = express.Router();
const {query}  = require('../utils/database'    )
const logger = require('../utils/logger')


// Select all from: table
router.get('/:table',(req,res)=>{
    const table = req.params.table;
    query(`SELECT * FROM ${table}`, [], (error, results) =>{
        if (error) throw res.status(500).json({error:error.message});
        res.status(200).json(results)
    }, req);
})

// Select one record from table by : id
router.get('/:table/:id',(req,res)=>{
    const table = req.params.table;
    const id = req.params.id
    query(`SELECT * FROM ${table} WHERE id=?`, [id], (error, results) =>{
        if (error) throw res.status(500).json({error:error.message});
        res.status(200).json(results)
    }, req);
})

module.exports = router;