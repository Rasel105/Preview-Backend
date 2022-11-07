const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const previewRoutes = require("./routes/preview.route");
const errorHandler = require("./middleware/errorHandler");
const { connectToServer } = require("./utils/dbConnect");

app.use(cors());
app.use(express.json());

connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } else {
    console.log(err);
  }
});

app.use('/api/v1/prevew-data', previewRoutes);

app.all("*", (req, res) => {
  res.send("No routes found");
});

app.use(errorHandler);