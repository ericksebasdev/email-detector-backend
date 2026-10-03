
import express from "express";
import { createCompany, getCompaniesByClient } from "../controllers/companies_controller.js";

const companiesRouter = express.Router();

companiesRouter.post("/clients/:clientId/companies",createCompany);
companiesRouter.get("/clients/:clientId/companies",getCompaniesByClient);

export default companiesRouter;