# Getir Challenge

Below will explain the challenge and the solution for each point.

## Requirements
* The code should be written in Node.js using express framework ✔️
* The endpoint should just handle HTTP POST requests ✔️
* The application should be deployed on AWS or Heroku (Heroku ✔️)
* The up do date repo should be publicly available in GitHub ✔️

## Deliverables
* The public repo URL which has the source code of this project... (Self ✔️)
* https://getir-ankara.herokuapp.com/getir you can send POST requests to this address.

## Crucial Points
* Delivering a working RESTful API. ✔️

Example result for sending the following JSON Body to the API endpoint.
```
Request payload:
{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 179,
    "maxCount": 180
}
```

```
Response payload:
{
    "code": 0,
    "msg": "Success",
    "records": [
        {
            "key": "XlqCuHpo",
            "createdAt": "2016-12-27T15:33:59.004Z",
            "totalCount": 179
        },
        {
            "key": "oABnNNFj",
            "createdAt": "2016-10-31T23:15:33.690Z",
            "totalCount": 179
        },
        {
            "key": "pfaneOsq",
            "createdAt": "2016-10-07T07:08:29.813Z",
            "totalCount": 179
        },
        {
            "key": "OPRGBZjF",
            "createdAt": "2016-07-12T14:52:23.018Z",
            "totalCount": 179
        },
        {
            "key": "XamyOvbV",
            "createdAt": "2016-07-10T21:06:13.251Z",
            "totalCount": 179
        },
        {
            "key": "dedEgceT",
            "createdAt": "2016-05-14T00:57:09.441Z",
            "totalCount": 179
        }
    ]
}
```

* Clean and production ready code ✔️ (Deployed and working successfully)
* Error handling ✔️
* Comments and documentation ✔️
* Unit and/or Integration Tests ✔️ (Written for DB read process as the DB user doesn't have any other permissions)
* Avoid over engineering ✔️

---

# How to use?
You should send a request to https://getir-ankara.herokuapp.com/getir with a valid JSON payload.
A valid payload consists of four parameters. `startDate`, `endDate`, `minCount` and `maxCount`.
If you fail to deliver any of these parameters error code 1 will greet you as the following.

```
{
    "code": 1,
    "msg": "Missing JSON Body value(s)."
}
```

If you provide a valid payload it will deliver the correct result as intended.
It will check between the startDate and endDate, after selecting the correct interval it will find summation of the `counts` array in the DB and project it as `totalCount`.
Another match process will happen to ensure `totalCount` is between `minCount` and `maxCount`.
Final product will be delivered as a JSON which consists of `code`, `msg` and `records` fields.
`code` can be either `0`, `1` or `2`. `0` indicates `success`, `1` indicates missing parameter in payload, `2` indicates that min value is greater than max value or vice versa. Defaults to `0`.
`msg` can be anything defined to explain the `code`. Defaults to `success`.
`records` is the filtered results given as an object.

