const express = require("express");
const app = express();
const reload = require('express-reload');
const path = require('path');
// const session = require("express-session");
const methodOverride = require("method-override");
// const flash = require("express-flash");
const logger = require("morgan");
const mainRoutes = require("./routes/main");
const accountRoutes = require("./routes/account");

//API Keys
app.get('/env', (req, res) => {
    res.json({
      youtubeKey: process.env.YOUTUBE_API
    });
  });

//Using EJS for views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(reload(path.join(__dirname, 'routes')));

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// // Setup Sessions
// app.use(
//     session({
//       secret: "keyboard cat",
//       resave: false,
//       saveUninitialized: false,
//       store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
//     })
// );

// //Use flash messages for errors, info, ect...
// app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/account", accountRoutes);

//Server Running
app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port ${process.env.PORT}, you better catch it!`);
});