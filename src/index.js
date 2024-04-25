require('dotenv').config({ path: "src/.env" });
const express = require('express');
const route = require('./router/router');

const app = express();
app.use(express.json());
app.use(route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}.`));