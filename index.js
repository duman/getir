var express = require('express');
var mongo = require('./Utils/db');
var getir = require("./Models/getir");
var app = express();
app.use(express.json());

app.post('/', async(req, res) => {
    const {startDate, endDate, minCount, maxCount} = req.body;

    let code = 0;
    let msg = "Success";

    if (!checkValues(req.body, "startDate|endDate|minCount|maxCount")) {
        code = 1;
        msg = "Missing JSON Body value(s).";
        let result = {
            code: code,
            msg: msg
        }
        return res.status(200).send(result);
    }

    const data = await getir.aggregate([
        {
            $match: { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } }
        },
        {
            $project: {
                _id : 0,
                key: "$key",
                createdAt: "$createdAt",
                totalCount: { "$sum": "$counts" },
            }
        },
        {
            $match: { totalCount: {$lte: maxCount, $gte: minCount} }
        }
        ], function (err, resp){
        if (resp) {
            let result = {
                code: code,
                msg: msg,
                records: resp
            }
            return res.status(200).send(result);
        } else {
            return res.status(200).send({message: "Data not found"});
        }
    });
});

app.listen(3000);

function checkValues(obj, list) {
    if (typeof list === "string") {
        list = list.split("|");
    }
    for (prop of list) {
        let val = obj[prop];
        if (val === null || val === undefined) {
            return false;
        }
    }
    return true;
}