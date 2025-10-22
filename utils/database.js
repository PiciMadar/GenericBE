require('dotenv').config()
const nodemon = require('nodemon');
const logger = require('./logger')

console.log(process.env)
var mysql = require('mysql');


var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DBHOST,
    user            : process.env.DBUSER,
    password        : process.env.DBPASS,
    database        : process.env.DBNAME
});


function query(sql, params = [] , callback, req = ''){

    const context = req ? `${req.method} ${req.originalUrl}` : 'NO CONTEXT'
    const txt = req.method == `GET` ? `sent` : `affected`

    pool.query(sql, params, (error,results) => {
        if(process.env.DEBUG == 1){
            if(error){
                logger.error(`[DB ERROR] : ${error.message}`);
            }
            else{
                const count = Array.isArray(results) ? results.length :  results.affectedRows;
                logger.info(`${context} - ${count} record(s) ${txt}`)
            }
        }
        if(callback) callback(error, results)
    })
}


module.exports = { query };
