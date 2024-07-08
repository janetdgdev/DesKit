const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
//const apiController = require("../controllers/api");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/search", apiController.search)

module.exports = router;
