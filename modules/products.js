const express = require("express")
const router = express.Router()
const pool = require('../utils/database')

// GET all products
router.get('/', (req, res) => {
  pool.query('SELECT * FROM termek', (error, results) => {
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(results)
  });
})

// GET one product by id
router.get('/:id', (req, res) => {
  let id = req.params.id
  pool.query(`SELECT * FROM termek WHERE termekID = ?`, [id], (error, results) => {
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(results)
  });
})

// DELETE product by id
router.delete('/:id', (req, res) => {
  let id = req.params.id
  pool.query(`DELETE FROM termek WHERE termekID = ?`, [id], (error, results) => {
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(results)
  });
})

// UPDATE product by id
router.patch('/:id', (req, res) => {
  let id = req.params.id
  let { termek, kategoriaNev, egyseg, nettoAr } = req.body
  pool.query(
    `UPDATE termek SET termek = ?, kategoriaNev = ?, egyseg = ?, nettoAr = ? WHERE termekID = ?`,
    [termek, kategoriaNev, egyseg, nettoAr, id],
    (error, results) => {
      if (error) return res.status(500).json({ error: error.message })
      res.status(200).json(results)
    }
  );
})

// POST new product
router.post('/', (req, res) => {
  let { termek, kategoriaNev, egyseg, nettoAr } = req.body
  pool.query(`INSERT INTO termek (termek,kategoriaNev,egyseg,nettoAr) VALUES (?,?,?,?)`, [termek, kategoriaNev, egyseg, nettoAr], (error, results) => {
    if (error) return res.status(500).json({ error: error.message })
    res.status(200).json(results)
  });
})

module.exports = router