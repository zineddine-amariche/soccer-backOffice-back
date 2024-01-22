
const http = require("http");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({

    })
  );
const routeAu = require("./routes/auth.routes");
const routeCl= require("./routes/club.routes");
const routeAd= require("./routes/admin.routes");
const connectDB1 = require("./configuration/mongoose");

const swaggerOptions = {
  definition: {
    info: {
      title: "API",
      description: "Description",
      contact: {
        name: "Farouk Boussaa",
      },
      server: ["http://localhost:3000"],
    },
  },
  apis: ["./routes/*.ts"],
};

const swaggerDoc = swaggerJsdoc(swaggerOptions);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDoc)); 
app.use("/api/auth", routeAu);
app.use("/api/club",routeCl);
app.use("/api/admin",routeAd)
app.use(express.static(__dirname + "/photos/"));
const start = async (port=process.env.PORT) => {
    try {
     
  
      await connectDB1();
      app.listen(port, () => console.log(`Server is listening on port ${port} `));
    } catch (error) {
      console.log(error);
    }
  };
  
  start();
  

