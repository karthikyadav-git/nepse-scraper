const express = require('express');
const scraper = require('../tools/scraper');
const DatabaseManager = require('../tools/databaseManager');

const router = express.Router();
const dbMan = new DatabaseManager('stocks.db');

const scrap = (req, res, next) => {
    try {
        scraper(); // Assuming scraper() is asynchronous
        next();
    } catch (error) {
        console.error("Error running the scraper:", error);
        res.status(500).json({ error: "Failed to update stock data." });
    }
};

router.route('/')
    .all(express.json(), scrap)
    .get((req, res) => {
        try {
            const data = dbMan.listOfTop(req.query.col, req.query.num || 10);

            if (!data) {
                throw new Error("No stock data found.");
            }

            return res.status(200).json({success: true, data});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to fetch stock data." });
        }
    });

module.exports = router;