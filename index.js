const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { connectDB } = require("./config/dbConnect");
const initWebRoutes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

connectDB();
app.use(cors());
app.use(
  cookieParser({
    httpOnly: true,
    secure: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);
PORT = process.env.PORT || 8008;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
