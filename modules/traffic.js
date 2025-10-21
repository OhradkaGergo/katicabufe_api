const express = require('express')
const router = express.Router()

const pool = require('../utils/database')

//select all traffic
router.get('/', (req, res) => {
    pool.query(`SELECT forgalom.id, termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva, kategoriaNev FROM forgalom
        INNER JOIN kategoria on kategoria.id = forgalom.kategoriaId`, (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json(results)
    })
})

//select one traf.
router.get('/:id', (req, res) => {
    let id = req.params.id
    pool.query(`SELECT * FROM forgalom

        WHERE forgalom.id=?`, [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json(results)
    })
})

/*
INNER JOIN kategoria on kategoria.id = forgalom.kategoriaId
*/


//post new
router.post('/', (req, res) => {
    const {termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva} = req.body
    pool.query(`INSERT INTO forgalom
        (termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva) VALUES (?, ?, ?, ?, ?, ?, ?)`, [termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json(results)
    });
});

//update
router.patch('/:id', (req, res) => {
    let id = req.params.id
    const {termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva} = req.body
    //UPDATE forgalom SET termek='Wawo', vevo='Owaw', kategoriaId=2, egyseg='dl', nettoar=510, mennyiseg=3, kiadva=1 WHERE forgalom.id=262
    pool.query(`UPDATE forgalom SET termek=?, vevo=?, kategoriaId=?, egyseg=?, nettoar=?, mennyiseg=?, kiadva=? WHERE id=?`, [termek, vevo, kategoriaId, egyseg, nettoar, mennyiseg, kiadva, id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json(results)
    })
})

//delete
router.delete('/:id', (req, res) => {
    let id = req.params.id
    pool.query(`DELETE FROM forgalom WHERE id=?`, [id], (error, results) => {
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json(results)
    })
})

module.exports = router
