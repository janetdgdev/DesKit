const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account");

//Main Routes - simplified for now
router.get("/profile", accountController.getProfile);
router.get("/account", accountController.getAccount);
router.get("/settings", accountController.getSettings);


module.exports = router;