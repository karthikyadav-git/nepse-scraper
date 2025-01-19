const path = require('path');
const fs = require('fs');
const express = require('express');

const router = express.Router();

const docsDirectory = path.join(__dirname, '..', 'docs');

router.route('/').get((req, res) => {
    const docsFile = path.join(docsDirectory, 'index.html');
    const docs = fs.readFileSync(docsFile, 'utf8');

    res.status(200).send(docs);
});

module.exports = router;