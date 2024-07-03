module.exports = {
    getProfile: (req, res) => {
      res.render("profile.ejs");
    },
    getAccount: (req, res) => {
        res.render("account.ejs");
      },
    getSettings: (req, res) => {
    res.render("settings.ejs");
    }
};
