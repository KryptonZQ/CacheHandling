const express = require('express');

const app = express();

const productRoutes = require('./routes/productRoutes');

const port = 3001;

app.use(express.json());

app.use(productRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});