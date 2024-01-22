import express from "express";
const router = express.Router();
const adminCon = require("../controlleurs/admin.controlleur");
const auth =require("../middleware/auth");

/**
 *  @swagger
 *  /api/admin/account:
 *    post:
 *      description: l'enregistrement d'un nouveau admin
 *      parameters:
 *        - in : body
 *          name: soccer
 *          schema:
 *            type: object
 *            required:
 *              - lastName
 *              - firstName
 *              - email
 *              - password
 *              - confirmPassword
 *              - phoneNumber
 *            properties:
 *              lastName:
 *                type: string
 *              firstName:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              confirmPassword:
 *                type: string
 *              phoneNumber:
 *                type: string
 *      responses:
 *        '201':
 *          description: Le compte est crée
 *        '400':
 *          description: le champ est vide
 *        '401':
 *          description: email existe déjà
 *        '403':
 *          description: non autoriser
 *        '404':
 *          description: le mot de passe et le mot de passe de confirmation sont diffirents
 */
router.post("/account",auth, adminCon.account);
/**
 *  @swagger
 *  /api/admin/:
 *    put:
 *      description: Modification de mon compte admin
 *      parameters:
 *        - in : body
 *          name: soccer
 *          schema:
 *            type: object
 *            required:
 *              - lastName
 *              - firstName
 *              - email
 *              - password
 *              - confirmPassword
 *              - phoneNumber
 *            properties:
 *              lastName:
 *                type: string
 *              firstName:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              confirmPassword:
 *                type: string
 *              phoneNumber:
 *                type: string
 *      responses:
 *        '201':
 *          description: votre compte a était bien modifier
 *        '401':
 *          description: l'email existe déjà
 *        '400':
 *          description: le champ est vide
 *        '403':
 *          description: non autoriser
 *        '404':
 *          description: le mot de passe et le mot de passe de confirmation sont diffirents
 */
router.put("", auth,adminCon.setAdmin);
module.exports = router;
