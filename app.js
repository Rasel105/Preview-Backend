const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());

// routes 
const previewRoute = require('./routes/preview.route');

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// posting to database 
app.use('/api/v1/preview', previewRoute);

module.exports = app;
