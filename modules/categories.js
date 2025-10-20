const express = require('express')
const router = express.Router()

const pool = require('../utils/database')

//select all category
router.get('/', (req, res) => {
    pool.query('SELECT * FROM kategoria', (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json(results)
    })
})

//select one cat.
router.get('/:id', (req, res) => {
    let id = req.params.id
    pool.query(`SELECT * FROM kategoria WHERE id=?`, [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json(results)
    })
})

//post new
router.post('/', (req, res) => {
    const { kategoriaNev } = req.body
    pool.query(`INSERT INTO kategoria (kategoriaNev) VALUES (?)`, [kategoriaNev], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json(results)
    })
})

//update
router.patch('/:id', (req, res) => {
    let id = req.params.id
    const { kategoriaNev } = req.body
    pool.query(`UPDATE kategoria SET kategoriaNev=? WHERE id=?`, [kategoriaNev, id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json(results)
    })
})

//delete
router.delete('/:id', (req, res) => {
    let id = req.params.id
    pool.query(`DELETE FROM kategoria WHERE id=?`, [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json(results)
    })
})

module.exports = router