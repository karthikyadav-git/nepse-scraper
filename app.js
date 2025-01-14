const express = require('express');
const app = express();
const symbolRoutes = require('./routes/symbol.routes')
const PORT = 3000;

app.use('/symbol', symbolRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
