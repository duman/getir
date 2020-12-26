var express = require('express');
const router = express.Router();
var mongo = require('../Utils/db');
var getir = require("../Models/getir");

router.post('/', async(req, res) => {
    const {startDate, endDate, minCount, maxCount} = req.body;

    let code = 0;
    let msg = "Success";

    let start = new Date(startDate);
    let end = new Date(endDate);

    if (!checkValues(req.body, "startDate|endDate|minCount|maxCount")) {
        code = 1;
        msg = "Missing JSON Body value(s).";
        let result = {
            code: code,
            msg: msg
        }
        return res.status(200).send(result);
    } else if (minCount > maxCount || maxCount < minCount || start > end || end < start) {
        code = 2;
        msg = "Minimum value is greater than maximum value or vice versa.";
        let result = {
            code: code,
            msg: msg
        }
        return res.status(200).send(result);
    }

    const data = await getir.aggregate([
        {
            $match: { createdAt: { $gte: start, $lte: end } }
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

module.exports = router;