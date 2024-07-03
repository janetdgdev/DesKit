const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
//const apiController = require("../controllers/api");

//Main Routes - simplified for now
router.get("/", homeController.getBody);
router.get("/calendar", homeController.getCalendar);
router.get("/screensaver", homeController.getScreensaver);
router.get("/stickynotes", homeController.getStickyNotes);
router.get("/timer", homeController.getTimer);
router.get("/txteditor", homeController.getTxtEditor);
router.get("/music", homeController.getMusic);

module.exports = router;
