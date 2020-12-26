const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(
    bodyParser.urlencoded({
        limit : '5mb',
        extended : false
    })
);

app.use(
    bodyParser.json({
        limit : '50mb'
    })
)

app.use(express.json());

// Route
const getirRoute = require('./Routes/getirRoute');

// Paths
app.use('/getir', getirRoute);

module.exports = app;
app.listen(process.env.PORT);