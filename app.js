const express = require('express');
const app = express();
const router = require('./routes/router')
const PORT = 3000;

app.use('/nepse', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
