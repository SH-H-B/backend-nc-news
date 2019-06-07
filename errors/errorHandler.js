exports.handle400 = (err, req, res, next) => {
  const codes = {
    23502: "Violates not null violation",
    "22P02": "Invalid input syntax for type integer",
    42703: "Undefined Column"
  };
  //console.log(err);
  if (codes[err.code]) res.status(400).send({ msg: codes[err.code] });
  if (err.status === 400) res.status(400).send({ msg: err.msg });
  else next(err);
};

exports.handle404 = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err);
  } else {
    next(err);
  }
};

exports.handle422 = (err, req, res, next) => {
  console.log(err);
  const codes = {
    23505: "Key Already Exists",
    23503: "Invalid Parameter"
  };
  if (codes[err.code]) {
    res.status(422).send({ msg: err });
  } else next(err);
};

exports.handle405 = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};
exports.handle500 = (req, res, next) => {
  res.status(500).send({ msg: res.body.message });
};
