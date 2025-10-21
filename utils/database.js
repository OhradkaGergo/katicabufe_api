require('dotenv').config()
const logger = require('./logger')

var mysql = require('mysql')


var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DBHOST,
  user            : process.env.DBUSER,
  password        : process.env.DBPASS,
  database        : process.env.DBNAME
})

function query(sql, params = [], callback, req = '') {
  const start = new Date()
  const context = req ? `${req.method} ${req.originalUrl}` : `NO CONTEXT`

  pool.query(sql, params, (error, results) => {
    if (process.env.DEBUG == 1) {
      const duration = Date.now() - start
    if (error) {
      logger.error(`[DB Error]: ${error.message}`)
    } else {
      const count = Array.isArray(results) ? results.length : results.affectedRows 
      logger.info(`${context} - ${count} record(s) added/changed | ${duration} ms`)
    }
    }

    if (callback) callback(error, results)
  })
}

/*
pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId)
});

pool.on('connection', function (connection) {
  console.log('Connection %d established', connection.threadId)
});

pool.on('enqueue', function (connection) {
  console.log('Waiting for available connection slot')
});

pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId)
});
*/

module.exports = { query }