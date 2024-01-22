const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN;
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
const Soccer = require("../models/auth.model");
interface e extends Request {
  cookies: { token: string };
  auth: object;
  _id: ObjectId;
}
module.exports = async (req: e, res: Response, next: NextFunction) => {

  const token = req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const bearerToken = token.substring(7);
  try {
    // const token = req.body.cookies.token?req.body.cookies.token: req.cookies.token;
    // const token =  req.cookies.token;
    // console.log('token', token)

    let decodeToken = await jwt.verify(bearerToken, SECRET_TOKEN);
    if (!decodeToken) throw Error("erreur de token");
    const soccer = await Soccer.findById({ _id: decodeToken.id });

    req.auth = { _id: decodeToken.id, type: soccer.type };
    req._id = decodeToken._id;

    next();
  } catch (error) {
    res.status(501).json({ error: "non autoriser" });
  }
};
