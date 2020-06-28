var express = require("express");
var router = express.Router();
//companies data file
var companiesData = require("./../data/companies.json");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/companies", function (req, res, next) {
  res.json(companiesData);
});

module.exports = router;
