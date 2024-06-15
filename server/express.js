import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

const configureExpressApp = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(compress());
  app.use(helmet());
  app.use(cors());
  app.use("/", userRoutes);
  app.use("/", authRoutes);

  app.get("/", (req, res) => {
    res.status(200).send(Template());
  });

  return app;
};

export default configureExpressApp;
