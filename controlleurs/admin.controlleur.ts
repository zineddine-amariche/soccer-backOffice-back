import { Request, Response } from "express";
import { ObjectId } from "mongoose";
const bcrypt = require("bcrypt");
const Soccer = require("../models/auth.model");
interface k extends Request {
  auth: { _id: ObjectId; type: number };
}

exports.account = async (req: k, res: Response) => {
  // if (!req.body.lastName) return res.status(400).json({ error: "le champ est vide" });
  // if(!req.body.firstName) return res.status(400).json({ error: "le champ est vide" });
  // if(!req.body.email) return res.status(400).json({ error: "le champ est vide" });
  // if(!req.body.password) return res.status(400).json({ error: "le champ est vide" });
  // if(!req.body.confirmPassword) return res.status(400).json({ error: "le champ est vide" });
  // if(!req.body.phoneNumber) return res.status(400).json({ error: "le champ est vide" });

  // Helper function to check if a field is empty
  const isEmpty = (field: string) => {
    return !field || field.trim() === "";
  };

  const { lastName, firstName, email, password, confirmPassword, phoneNumber } =
    req.body;

  const fieldsToCheck = [
    { field: lastName, name: "lastName" },
    { field: firstName, name: "firstName" },
    { field: email, name: "email" },
    { field: password, name: "password" },
    { field: confirmPassword, name: "confirmPassword" },
    { field: phoneNumber, name: "phoneNumber" },
  ];

  for (const fieldInfo of fieldsToCheck) {
    if (isEmpty(fieldInfo.field)) {
      return res
        .status(400)
        .json({ error: `Le champ ${fieldInfo.name} est vide` });
    }
  }

  try {
    if (req.auth.type !== 2)
      return res.status(403).json({ message: "non autoriser" });
    const soccer = await Soccer.findOne({ email: req.body.email });
    if (soccer) return res.status(401).json({ error: "email existe déjà " });
    if (req.body.password !== req.body.confirmPassword)
      return res.status(404).json({
        error:
          "le mot de passe et le mot de passe de confirmation sont diffirents",
      });
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.confirmPassword = await bcrypt.hash(req.body.confirmPassword, 10);

    const soccer1 = new Soccer({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      phoneNumber: req.body.phoneNumber,
      type: 2,
      role: "ADMIN",
    });
    await soccer1.save();
    res.status(201).json({ message: "le compte est créer" });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ error: "erreur de serveur" });
  }
};
exports.setAdmin = async (req: k, res: Response) => {

 
  if (!req.body.lastName)
    return res.status(400).json({ error: "le champ est vide" });
  if (!req.body.firstName)
    return res.status(400).json({ error: "le champ est vide" });
  if (!req.body.email)
    return res.status(400).json({ error: "le champ est vide" });
  if (!req.body.password)
    return res.status(400).json({ error: "le champ est vide" });
  if (!req.body.confirmPassword)
    return res.status(400).json({ error: "le champ est vide" });
  if (!req.body.phoneNumber)
    return res.status(400).json({ error: "le champ est vide" });
 
  try {
    if (req.auth.type !== 2)
      return res.status(403).json({ message: "non autoriser" });
    const soccer = await Soccer.findOne({ email: req.body.email });
    // if (soccer) return res.status(401).json({ error: "email existe déjà " });
    if (req.body.password !== req.body.confirmPassword)
      return res.status(404).json({
        error:
          "le mot de passe et le mot de passe de confirmation sont diffirents",
      });
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.confirmPassword = await bcrypt.hash(req.body.confirmPassword, 10);
    const soccer1 = await Soccer.findOne({ _id: req.auth._id }).populate(
      "club"
    );

    soccer1.lastName = req.body.lastName;
    soccer1.firstName = req.body.firstName;
    soccer1.email = req.body.email;
    soccer1.password= req.body.password;
    soccer1.confirmPassword= req.body.confirmPassword;
    soccer1.phoneNumber = req.body.phoneNumber;
    soccer1.type = 2;
    soccer1.role = "ADMIN";
    await soccer1.save();

    res.status(201).json({ message: "votre compte a était bien modifier",id:req.auth._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "erreur de serveur" });
  }
};
