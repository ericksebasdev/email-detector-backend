import express  from "express";
import { createEmail } from "../controllers/emails_controllers.js";


const emailRoutes = express.Router();

emailRoutes.post("/clients/:clientId/emails",createEmail);

export default emailRoutes;