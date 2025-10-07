const express = require('express');
const router = express.Router();
const pool = require('../utils/database');

router.get('/', (req, res) => {
    const summaryQuery = `
      SELECT 
        COUNT(DISTINCT vevo) AS usersCount, 
        COUNT(DISTINCT termek) AS productsCount, 
        SUM(mennyiseg) AS salesSum, 
        SUM(mennyiseg * nettoar) AS priceSum
      FROM forgalom;
    `;

    const productQuery = `
      SELECT 
        termek, 
        SUM(mennyiseg) AS count, 
        SUM(mennyiseg * nettoar) AS price
      FROM forgalom
      GROUP BY termek;
    `;

    pool.query(summaryQuery, (err, summaryResult) => {
        if (err) return res.status(500).json({ error: err.message });
        pool.query(productQuery, (err2, productResults) => {
            if (err2) return res.status(500).json({ error: err2.message });
            const stats = {
                usersCount: summaryResult[0].usersCount,
                productsCount: summaryResult[0].productsCount,
                salesSum: summaryResult[0].salesSum,
                priceSum: summaryResult[0].priceSum,
                products: productResults.map(row => ({
                    product: row.termek,
                    count: row.count,
                    price: row.price
                })
                )
            };
            res.json(stats);
        });
    });
});

module.exports = router;