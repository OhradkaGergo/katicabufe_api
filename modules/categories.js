const express = require('express')
const router = express.Router()
const { query } = require('../utils/database')
const logger = require('../utils/logger')


const pool = require('../utils/database')

//select all category
router.get('/', (req, res) => {
    query('SELECT * FROM kategoria', [], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        //logger.info(`[GET /categories] -> ${results.length} rekord küldves`)
        res.status(200).json(results)
    }, req)
})

//select one cat.
router.get('/:id', (req, res) => {
    let id = req.params.id
    query(`SELECT * FROM kategoria WHERE id=?`, [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json(results)
    }, req)
})

//post new
router.post('/', (req, res) => {
    const { kategoriaNev } = req.body
    query(`INSERT INTO kategoria (kategoriaNev) VALUES (?)`, [kategoriaNev], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json(results)
    }, req)
})

//update
router.patch('/:id', (req, res) => {
    let id = req.params.id
    const { kategoriaNev } = req.body
    query(`UPDATE kategoria SET kategoriaNev=? WHERE id=?`, [kategoriaNev, id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json(results)
    }, req)
})

//delete
router.delete('/:id', (req, res) => {
    let id = req.params.id
    query(`DELETE FROM kategoria WHERE id=?`, [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json(results)
    }, req)
})

module.exports = router