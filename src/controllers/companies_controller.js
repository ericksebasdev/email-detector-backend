import db from "../config/database.js";

const createCompany = async(req,res)=>{
    try{
        const {clientId}= req.params;
        const {name} = req.body;
        console.log("Id CLiente",clientId);
        console.log("NOmbre",name);
        if(!name) return res.status(400).json({
            message:"El nombre de la empresa es obligatorio"
        });
        const nameCompany = name.trim();
        if(!nameCompany) return res.status(400).json({
            message:"El nombre de la empresa no puede estar vacio"
        });
        const [clients] = await db.execute(
            `
            SELECT id FROM clients WHERE id = ?
            `,[clientId]
        );
        if(clients.length === 0) return res.status(404).json({
            message:"El cliente no existe"
        });
        const [result] = await db.execute(
            `
            INSERT INTO companies(client_id,name)
            VALUES ( ? , ? )
            `,[clientId,nameCompany]
        );
        return res.status(201).json({
            message:"Empresa autorizada creada correctamente",
            company:{
                id : result.insertId,
                clientId: Number(clientId),
                name: nameCompany
            }
        });

    }
    catch(error){
        console.error(
            "Error al crear empresa:",
            error
        );

        // Error 1062 = registro duplicado por UNIQUE
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Esta empresa ya está autorizada para el cliente"
            });
        }

        return res.status(500).json({
            message: "Error interno del sistema"
        });
    }
}
const getCompaniesByClient = async(req,res)=>{
    try{
        const {clientId} = req.params;
        const [clients] = await db.execute(`
            SELECT id,name
            FROM clients
            WHERE id = ?
            `,[clientId]

        );
        if(clients.length === 0)return res.status(404).json({
            message:"El cliente no existe"
        });
        const [companies]= await db.execute(
            `
                SELECT id,client_id,name,created_at
                FROM companies
                WHERE client_id = ?
                ORDER BY id DESC
            `,[clientId]
        );
        console.log("Empresas obtenidas correctamente",companies.length);
        return res.status(200).json({
            message:"Empresas obtenidas correctamente",
             client: {
                id: clients[0].id,
                name: clients[0].name
            },
            companies:companies
        });
    }
    catch(error){
        console.error(
            "Error al obtener empresas:",
            error
        );

        return res.status(500).json({
            message: "Error interno del sistema"
        });

    }
}
export{
    createCompany,
    getCompaniesByClient
};