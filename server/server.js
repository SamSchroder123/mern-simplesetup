import express from "express";
import config from "./../config/config";
import configureExpressApp from "./express";
import devBundle from "./devBundle"; // comment out for production
import path from "path";
import Template from "./../template";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";

// Initialize Express app
const app = configureExpressApp();

// Define the current working directory
const CURRENT_WORKING_DIR = process.cwd();

// Serve static files
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// Compile development bundle
devBundle.compile(app); // comment out for production

// Define routes
app.get("/", (req, res) => {
  res.status(200).send(Template());
});

// Start the server
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});

// // Connect to MongoDB
// const url =
//   process.env.MONGODB_URI || "mongodb://localhost:27017/mernSimpleSetup";
// MongoClient.connect(url, (err, db) => {
//   if (err) {
//     console.error("Failed to connect to MongoDB", err);
//   } else {
//     console.log("Connected successfully to MongoDB server");
//     db.close();
//   }
// });

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  throw new Error(
    `unable to connect to database: ${config.mongoUri}\n ${err.message}`
  );
});
