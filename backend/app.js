const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productsRoutes = require("./routes/products-routes");
const HttpError = require("./models/http-error");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.use("/api/products", productsRoutes);

// Unsupported Routes
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// Error Handling
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2opsshm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
