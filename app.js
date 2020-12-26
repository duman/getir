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

// Path
app.use('/getir', getirRoute);

module.exports = app;
app.listen(process.env.PORT); // Heroku automatically sets this one, if I manually define a port such as 3000 it won't work.
// See https://dev.to/lawrence_eagles/causes-of-heroku-h10-app-crashed-error-and-how-to-solve-them-3jnl for further details.