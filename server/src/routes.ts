import express from "express";
import ClassesController from "./controllers/ClassesController";
import ConnectionsController from "./controllers/ConnectionsController";
import multer from "multer";
import multerConfig from "./config/multer";
import { Joi, celebrate } from "celebrate";

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const upload = multer(multerConfig);

routes.post(
  "/classes",
  upload.single("avatar"),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      whatsapp: Joi.string().required(),
      bio: Joi.string().required(),
      subject: Joi.string().required(),
      cost: Joi.string().required(),
      schedule: Joi.string().required(),
    }),
  }),
  classesController.create
);
routes.get("/classes", classesController.index);
routes.post("/connections", connectionsController.create);
routes.get("/connections", connectionsController.index);

export default routes;
