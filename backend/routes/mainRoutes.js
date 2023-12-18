const router = require('express').Router()

const { basic } = require("../controllers/basicController")

router.route("/").get(basic);

module.exports = router