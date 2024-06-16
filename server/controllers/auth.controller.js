import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { expressjwt as expressJwt } from "express-jwt";
import config from "./../../config/config.js";

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status("401").json({ error: "User not found" });
    }

    if (!user.authenticate(req.body.password)) {
      return res
        .status("401")
        .send({ error: "Email and password do not match." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      algorithm: "RS256",
    });

    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status("401").json({ error: "Could not sign in" });
  }
};
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "signed out",
  });
};

const jwtOptions = {
  secret: config.jwtSecret,
  algorithms: ["RS256"],
  userProperty: "auth",
};
console.log("expressJwt: " + expressJwt);
console.log("jwtOptions: " + jwtOptions);
const requireSignin = expressJwt(jwtOptions);
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
