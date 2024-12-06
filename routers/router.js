const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const scrapper = require('../components/scrapper');
const PORT = 3000;

const db = new Database('./databases/stocks.db');

// Middleware to run the scraper
const middle = (req, res, next) => {
    try {
        scrapper(); // Assuming scrapper() is asynchronous
        next();
    } catch (error) {
        console.error("Error running the scraper:", error);
        res.status(500).json({ error: "Failed to update stock data." });
    }
};

router.route('/').get((req, res) => {
    res.status(200).send('Prices!');
})

// Define the route
router.route('/:symbol')
    .all(express.json(), middle)
    .get((req, res) => {
        try {
            const sql = db.prepare(`SELECT * FROM stockPrices WHERE symbol = ?`);
            const data = sql.get(req.params.symbol);

            if (data.length === 0) {
                return res.status(404).json({ error: "No data found for the given symbol." });
            }

            res.status(200).json({ success: true, data });
        } catch (error) {
            console.error("Database query error:", error);
            res.status(500).json({ error: "Failed to fetch stock data." });
        }
    });

module.exports = router;
