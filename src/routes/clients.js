
import express from "express";
import { auth, isAdmin } from "../middleware/auth.js";
import { createClient,  getClients } from "../controllers/clients_controller.js";

const router = express.Router();

router.get("/", getClients);

router.post("/", createClient);


router.post("/:id/authorized-emails", auth, isAdmin, async(req,res)=>{
 const client = await Client.findById(req.params.id);
 client.allowedEmails.push(req.body.email);
 await client.save();
 res.json(client);
});

export default router;
