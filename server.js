const express = require('express')
var cors = require('cors')

const categoriesRoute = require('./modules/categories')
const trafficRoute = require('./modules/traffic')

const app = express()

var mysql = require('mysql')
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : '2025_katicabufe'
})

app.use('/categories', categoriesRoute)
app.use('/traffic', trafficRoute)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/categories', (req, res) => {
    pool.query('SELECT * FROM kategoria', (error, results) => {
        if (error) throw error
        res.send(results)
    })
})

app.get('/traffic', (req, res) => {
    pool.query(`
        SELECT * FROM forgalom
        INNER JOIN kategoria ON kategoria.id = forgalom.kategoriaId
        `, (error, results) => {
        if (error) throw error
        res.send(results)
    })
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})