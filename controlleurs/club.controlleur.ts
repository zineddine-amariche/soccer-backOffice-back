import { Request,Response } from "express";
const Club = require("../models/club.model");
const Soccer = require("../models/auth.model")
import mongoose from "mongoose";
import { ObjectId } from "mongoose";
interface k extends Request {

  auth:{_id:ObjectId}
  
}
exports.register = async (req:k, res:Response) => {
  if(!req.body.name) return res.status(400).json({ error: "le name est vide" });
  if(!req.body.headName) return res.status(400).json({ error: "le headName est vide" });
  if(!req.body.email) return res.status(400).json({ error: "l'email est vide" });
  if(!req.body.description) return res.status(400).json({ error: "la discription est vide" });
  if(!req.body.address) return res.status(400).json({ error: "l'address est vide" });
  if(!req.body.phoneNumber) return res.status(400).json({ error: "le phoneNumber est vide" });
  if(!req.body.file) return res.status(400).json({ error: "la photo est vide" });
    try {
      const club = await Club.findOne().or([{ email: req.body.email},{name:req.body.name }]);
      if (club)
        return res.status(401).json({ error: "Club existe déjà " });
        
        const soccer = await Soccer.findOne({_id:req.auth._id}).populate("club");
      const club1 = new Club({
        name: req.body.name,
        headName:req.body.headName,
        email: req.body.email,
        description: req.body.description,
        adress: req.body.adress,
        phoneNumber: req.body.phoneNumber,
        photo: req.body.file.filename,
        createdDate:Date(),
        createdBy: soccer,
        
      });
      await club1.save();
      soccer.club=club1;
      await soccer.save();
      res.status(201).json({ message: "le compte est créer" });
    } catch (error) {
      console.log(error,"error");
      res.status(500).json({ error: "erreur de serveur", });
    }
  };
  exports.getClubs = async (req:Request, res:Response) => {
    try {
      const club = await Club.find()
        .select("-__v -email -adress -photo")
        .populate("createdBy", "-password -__v -lastName -firstName -email -confirmPassword -phoneNumber");
  
      res.status(200).json(club);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "erreur de serveur" });
    }
  };
  exports.getClub = async (req:Request, res:Response) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(403).json({ message: " L'id est invalide" });
  
      let club = await Club.findOne({ _id: req.params.id })
        .select("-__v -email -adress -photo")
        .populate("createdBy", "-password -__v -lastName -firstName -email -confirmPassword -phoneNumber");
  
      if (!club) return res.status(404).json({ message: "le club n'éxiste pas" });
      res.status(200).json(club);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "erreur de serveur" });
    }
  };
  exports.deleteClub = async (req:Request, res:Response) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(403).json({ message: "le id est invalide" });
      const club = await Club.findOneAndDelete({ _id: req.params.id });
      if (!club) return res.status(404).json({ message: "le club n'éxiste pas" });
      res.status(201).json({ message: "le club a était bien supprimer" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "erreur de serveur" });
    }
  };
  exports.deleteClubs = async (req:Request, res:Response) => {
    try {
      await Club.deleteMany({});
      return res.status(200).json({ msg: "delete all clubs successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "erreur de serveur" });
    }
  };
  exports.setClub = async (req:k, res:Response) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(403).json({ message: "le id est invalide" });
      const club = await Club.findOne({ _id: req.params.id }).populate(
        "createdBy"
      );
  
      if (!club) return res.status(404).json({ message: "le club n'éxiste pas" });
      
        if(!req.body.name) return res.status(400).json({ error: "le name est vide" });
        if(!req.body.headName) return res.status(400).json({ error: "le headName est vide" });
        if(!req.body.email) return res.status(400).json({ error: "l'eamil est vide" });
        if(!req.body.description) return res.status(400).json({ error: "la discription est vide" });
        if(!req.body.address) return res.status(400).json({ error: "l'address est vide" });
        if(!req.body.phoneNumber) return res.status(400).json({ error: "le phoneNumber est vide" });
        if(!req.file) return res.status(400).json({ error: "la photo est vide" });

        const club1 = await Club.findOne({ name: req.body.name });
      if (club1)
        return res.status(401).json({ message: "le nom de club existe déjà" });
        const soccer = await Soccer.findOne({_id:req.auth._id}).populate("club");
        
          club.name= req.body.name;
          club.headName=req.body.headName;
          club.email= req.body.email;
          club.description= req.body.description;
          club.adress= req.body.adress;
          club.phoneNumber= req.body.phoneNumber;
          club.photo= req.file.filename;
          club.createdDate=Date();
          club.status=req.body.status;
          club.createdBy= soccer;
        await club.save();
  
      res.status(201).json({ message: "le club a était bien modifier" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "erreur de serveur" });
    }
  };
  exports.bannirClub = async (req:k, res:Response) => {
    if(!req.body.argument) return res.status(400).json({ error: "le champ est vide" });
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(403).json({ message: "l'id est invalide" });
      const club = await Club.findOne({ _id: req.params.id }).populate(
        "createdBy"
      );
  
      if (!club) return res.status(404).json({ message: "le club n'éxiste pas" });
        const soccer = await Soccer.findOne({_id:req.auth._id}).populate("club");
          club.status="BANNED";
          club.argument=req.body.argument;
          club.createdBy= soccer;
       
        await club.save();
  
      res.status(201).json({ message: "le club a était banni" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "erreur de serveur" });
    }
  };
  exports.validerClub = async (req:k, res:Response) => {
    if(!req.body.argument) return res.status(400).json({ error: "le champ est vide" });
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(403).json({ message: "l'id est invalide" });
      const club = await Club.findOne({ _id: req.params.id }).populate(
        "createdBy"
      );
  
      if (!club) return res.status(404).json({ message: "le club n'éxiste pas" });
        const soccer = await Soccer.findOne({_id:req.auth._id}).populate("club");
          club.status="VALIDATED";
          club.argument=req.body.argument;
          club.createdBy= soccer;
       
        await club.save();
  
      res.status(201).json({ message: "le club a était validé" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "erreur de serveur" });
    }
  };