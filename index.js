require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const { sequelize: db } = require("./models/index.js");
const router = require("./routes/routes.js");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1", router);

// swagger api documentation
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Car management api",
      version: "0.1.0",
      description: "Create an API that can manage cars with login, register, CRUD and authentication/authorization features.",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./lib/swagger/*.yaml"],
};
const spacs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(spacs));

// running app
db.authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT} and successfully connected to database`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
