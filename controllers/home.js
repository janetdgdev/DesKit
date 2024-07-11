module.exports = {
    getBody: (req, res) => {
    res.render("body.ejs");
    },
    getCalendar: (req, res) => {
      res.render("calendar.ejs");
      },
    getScreensaver: (req, res) => {
      res.render("screensaver.ejs");
    },
    getStickyNotes: (req, res) => {
      res.render("sticky-notes.ejs");
      },
    getTimer: (req, res) => {
      res.render("timer.ejs");
    },
    getTxtEditor: (req, res) => {
      res.render("txteditor.ejs");
      },
    getMusic: (req, res) => {
      res.render("youtube.ejs");
    },
};
