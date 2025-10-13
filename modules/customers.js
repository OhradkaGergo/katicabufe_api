const express = require("express")
const router = express.Router()
const pool = require('../utils/database')


// GET all customers
router.get('/', (req, res) => {
  pool.query('SELECT * FROM vevo', (error, results) => {
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(results)
  });
})

// GET one customer by id
router.get('/:id', (req, res) => {
  let id = req.params.id
  pool.query(`SELECT * FROM vevo WHERE vevoID = ?`, [id], (error, results) => {
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(results)
  });
})

// POST new customer
router.post('/', (req, res) => {
  let { vevoNev } = req.body
  pool.query(`INSERT INTO vevo (vevoNev) VALUES (?)`, [vevoNev], (error, results) => {
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(results)
  });
})

// DELETE customer by id
router.delete('/:id', (req, res) => {
  let id = req.params.id
  pool.query(`DELETE FROM vevo WHERE vevoID = ?`, [id], (error, results) => {
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(results)
  });
})

// UPDATE customer by id
router.patch('/:id', (req, res) => {
  let id = req.params.id
  let { vevoNev } = req.body
  pool.query(`UPDATE vevo set vevoNev = ? WHERE vevo.vevoID = ?`, [vevoNev, id], (error, results) => {
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(results)
  });
})

module.exports = router