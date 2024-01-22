import express from "express";
const router = express.Router();
const clubCon = require("../controlleurs/club.controlleur");
const auth =require("../middleware/auth");
const multer = require("../middleware/multer");

/**
 *  @swagger
 *  /api/club/register:
 *    post:
 *      description: l'enregistrement d'un nouveau club
 *      parameters:
 *        - in : body
 *          name: club
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - headName
 *              - email
 *              - description
 *              - photo
 *              - phoneNumber
 *              - address
 *            properties:
 *              name:
 *                type: string
 *              headName:
 *                type: string
 *              email:
 *                type: string
 *              description:
 *                type: string
 *              photo:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              adress:
 *                type: String
 *      responses:
 *        '201':
 *          description: Le compte est crée
 *        '400':
 *          description: le champ est vide
 *        '401':
 *          description: Club existe déjà
 */
router.post("/register",multer,auth, clubCon.register);
/**
 *  @swagger
 *  /api/club/getClubs:
 *    get:
 *      description: Affichage des différents clubs
 *      responses:
 *        '200':
 *          description: Successfuly
 */
router.get("/getClubs", clubCon.getClubs);
/**
 *  @swagger
 *  /api/club/getClubs/:id:
 *    get:
 *      description: Affichage d'un club byId
 *      parameters:
 *        - in : params
 *          name: club
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: Integer
 *      responses:
 *        '200':
 *          description: Successfuly
 *        '403':
 *          description: l'id est invalide
 *        '404':
 *          description: le club n'éxiste pas
 */
router.get("/getClubs/:id", auth, clubCon.getClub);
/**
 *  @swagger
 *  /api/club/:id:
 *    delete:
 *      description: Suppression d'un club
 *      parameters:
 *        - in : params
 *          name: club
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: Integer
 *      responses:
 *        '201':
 *          description: Le club a était supprimer
 *        '404':
 *          description: Le club n'éxiste pas
 *        '403':
 *          description: le id est invalide
 */
router.delete("/:id", auth, clubCon.deleteClub);
/**
 *  @swagger
 *  /api/club/deleteAll:
 *    delete:
 *      description: Suppression de tout les Clubs
 *      responses:
 *        '200':
 *          description: delete all clubs successfully
 */
router.delete("/deleteAll", auth, clubCon.deleteClubs);
/**
 *  @swagger
 *  /api/club/:id:
 *    put:
 *      description: Modification d'un club
 *      parameters:
 *        - in : body
 *          name: club
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - headName
 *              - email
 *              - description
 *              - address
 *              - phoneNumber
 *              - photo
 *            properties:
 *              name:
 *                type: string
 *              headName:
 *                type: string
 *              email:
 *                type: string
 *              description:
 *                type: string
 *              address:
 *                type: string
 *              phoneNumber:
 *                type: string
 *              photo:
 *                type: string
 *        - in : params
 *          name: club
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: Integer
 *      responses:
 *        '201':
 *          description: Le club a était bien modifier
 *        '404':
 *          description: Le club n'éxiste pas
 *        '401':
 *          description: le nom de club existe déjà
 *        '400':
 *          description: le champ est vide
 *        '403':
 *          description: le id est invalide
 */
router.put("/:id", auth, multer,clubCon.setClub);
/**
 *  @swagger
 *  /api/club/banned/:id:
 *    put:
 *      description: Bannir un club
 *      parameters:
 *        - in : body
 *          name: club
 *          schema:
 *            type: object
 *            required:
 *              - argument
 *            properties:
 *              argument:
 *                type: string
 *        - in : params
 *          name: club
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: Integer
 *      responses:
 *        '201':
 *          description: Le club a était banni
 *        '404':
 *          description: Club n'éxiste pas
 *        '403':
 *          description: le id est invalide
 *        '400':
 *          description: le champ est vide
 */
router.put("/banned/:id", auth, clubCon.bannirClub);
/**
 *  @swagger
 *  /api/club/validated/:id:
 *    put:
 *      description: Valider un club
 *      parameters:
 *        - in : body
 *          name: club
 *          schema:
 *            type: object
 *            required:
 *              - argument
 *            properties:
 *              argument:
 *                type: string
 *        - in : params
 *          name: club
 *          schema:
 *            type: object
 *            required:
 *              - id
 *            properties:
 *              id:
 *                type: Integer
 *      responses:
 *        '201':
 *          description: Le club a était validé
 *        '404':
 *          description: Club n'éxiste pas
 *        '403':
 *          description: le id est invalide
 *        '400':
 *          description: le champ est vide
 */
router.put("/validated/:id", auth, clubCon.validerClub);
module.exports = router;