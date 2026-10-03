import db from "../config/database.js";


const createClient = async(req,res)=>{
    try{
        const {name} = req.body;
        if(!name) return res.status(400).json({
            message:"El nombre del cliente es obligatorio"
        });
        const clientName = name.trim();
        if(!clientName) return res.status(400).json({
            message:"El nombre del cliente no puede estar vacio"
        });
        const [result] = await db.execute(
         `
         INSERT INTO clients(name) VALUES (?)
         `,[clientName]  
        );
        console.log("Cliente creado",result);
        return res.status(201).json({
            message:"Cliente creado correctamente",
            client:{
                id:result.insertId,
                name:clientName

            }
        });
    }
    catch(e){
        console.error("Error creando el cliente",e);
        return res.status(500).json({
            message:"Error interno del sistema"
        });
    }
};
const getClients = async(req,res)=>{
    try{
        const [rows] = await db.execute(
            `
            SELECT id , name , created_at FROM clients ORDER BY id DESC
            `
        );
        console.log("Clientes encontrados: ", rows.length);
        return res.status(200).json({
            message:"Clientes obtenidos correctamente",
            clients: rows
        })
    }
     catch(e){
        console.error("Error encontando a los clientes",e);
        return res.status(500).json({
            message:"Error interno del sistema"
        });
    }
};
export {
    createClient,
    getClients
} ;