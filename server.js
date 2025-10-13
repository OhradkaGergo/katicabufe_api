const express = require('express')
var cors = require('cors')

const categoriesRoute = require('./modules/categories')
const trafficRoute = require('./modules/traffic')
const statisticsRoute = require('./modules/statistics')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res) => {
    res.send('Backend API by Bajai SZC Türr István Technikum - 13.a Szoftverfejlesztő')
})

app.use('/categories', categoriesRoute)
app.use('/traffic', trafficRoute)
app.use('/statistics', statisticsRoute)

/*
app.get('/categories', (req, res) => {
    
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
*/

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})