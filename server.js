const express = require('express')
var cors = require('cors')

const categoriesRoute = require('./modules/categories')
const trafficRoute = require('./modules/traffic')
const statisticsRoute = require('./modules/statistics')
const logger = require('./utils/logger')

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

app.listen(process.env.PORT, () => {
    logger.info(`Server is running on http://localhost:${process.env.PORT}`)
    //console.log(`Server is running on http://localhost:${process.env.PORT}`)
})


/*



Tapsoló kezekTapsoló kezekTapsoló kezekTapsoló kezek

*/