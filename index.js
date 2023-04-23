require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { sequelize: db } = require("./models/index.js");
const router = require("./routes/routes.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1", router);

db.authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT} and successfully connected to database`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
