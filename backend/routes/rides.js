const express = require("express");
const router = express.Router();
const { bookRide } = require("../controllers/rideController");

router.post("/", bookRide);

module.exports = router;
