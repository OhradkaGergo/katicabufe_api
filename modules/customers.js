const express = require("express")
const router = express.Router()
const { query } = require('../utils/database')


// GET all customers
router.get('/', (req, res) => {
  query('SELECT * FROM vevo', [], (error, results) => {
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(results)
  }, req);
})

// GET one customer by id
router.get('/:id', (req, res) => {
  let id = req.params.id
  query(`SELECT * FROM vevo WHERE vevoID = ?`, [id], (error, results) => {
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(results)
  }, req);
})

// POST new customer
router.post('/', (req, res) => {
  let { vevoNev } = req.body
  query(`INSERT INTO vevo (vevoNev) VALUES (?)`, [vevoNev], (error, results) => {
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(results)
  }, req);
})

// DELETE customer by id
router.delete('/:id', (req, res) => {
  let id = req.params.id
  query(`DELETE FROM vevo WHERE vevoID = ?`, [id], (error, results) => {
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(results)
  }, req);
})

// UPDATE customer by id
router.patch('/:id', (req, res) => {
  let id = req.params.id
  let { vevoNev } = req.body
  query(`UPDATE vevo set vevoNev = ? WHERE vevo.vevoID = ?`, [vevoNev, id], (error, results) => {
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(results)
  }, req);
})

module.exports = router