import db from "../config/database.js";
import Email from "../models/Email.js";

const createEmail = async(req,res) =>{
    try{
        const {clientId} = req.params;
        const{
            companyId,
            recipient,
            sender,
            date,
            smtpCode,
            content
        } = req.body;
        console.log("REGISTRANDO CORREO");
        console.log("Cliente:", clientId);
        console.log("Empresa:", companyId);
        console.log("Destinatario:", recipient);
        console.log("Remitente:", sender);
        console.log("Fecha:", date);
        console.log("SMTP:", smtpCode);
        console.log("=================================");

        if(
            !companyId ||
            !sender||
            !recipient ||
            !date ||
            !smtpCode ||
            !content
        ){
            return res.status(400).json({
                message:"Todos los campos son obligatorios"
            });
        };
        const [clients] = await db.execute(
             ` 
             SELECT id
             FROM clients
             WHERE id = ?
             `,[clientId]
        );
        console.log("Cleinte encontrado",clients);
        if(clients.length ===0)return res.status(404).json({
            message:"El cliente no existe"
        });
        const [companies] = await db.execute(
             ` 
             SELECT id,name
             FROM companies
             WHERE id = ?
             AND client_id = ?
             `,[companyId , clientId]
        );
        if(companies.length === 0)return res.status(403).json({
            message:"La empresa no está autorizada para este cliente"
        });
        const [result] = await db.execute(
             `
             INSERT INTO emails(company_id,recipient,sender,email_date,smtp_code,content) VALUES (? , ? , ? , ? , ? , ?)
              `,[
                companyId,
                recipient,
                sender,
                date,
                smtpCode,
                content
              ]
        );
        console.log("Correo registrado: ",result);

        return res.status(201).json({
            message:"El correo se ha registrado correctamente",
            email:{
                id: result.insertId,
                clientId:Number(clientId),
                companyId:Number(companyId),
                recipient,
                sender,
                date,
                smtpCode,
                content
            }
        });

     } catch (e) {

        console.error(
            "Error al registrar correo:",
            e
        );

        if (e.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "El código SMTP ya está registrado para esta empresa"
            });
        }

        return res.status(500).json({
            message: "Error interno del sistema"
        });
    }
};

export{
    createEmail
};