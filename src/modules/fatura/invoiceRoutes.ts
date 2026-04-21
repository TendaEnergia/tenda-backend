import { Router } from "express";
import multer from "multer";
import uploadConfig from "../../shared/config/multer";
import { create } from "./controller/FaturaControlador";

const upload = multer(uploadConfig);
const invoiceRoutes = Router();

invoiceRoutes.post("/invoices/process", upload.single("invoice"), create);

export default invoiceRoutes;
