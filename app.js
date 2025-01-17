const express = require('express');
const docRoutes = require('./routes/docs.routes');
const symbolRoutes = require('./routes/symbol.routes');

const app = express();
const PORT = 3000;

app.use('/docs', docRoutes);
app.use('/symbol', symbolRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
