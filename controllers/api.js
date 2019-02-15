const fs = require("fs");

exports.getEndPoints = (req, res, next) => {
  fs.readFile("./api_endpoints.json", (err, data) => {
    if (err) throw err;
    res.status(200).send(JSON.parse(data));
  });
};
