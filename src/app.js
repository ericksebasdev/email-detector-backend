import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import authRoutes from "./routes/auth.js";
import clientRoutes from "./routes/clients.js";
import db from './config/database.js';
import companiesRouter from "./routes/companies.js";
import emailRoutes from "./routes/emails.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


// Swagger
const swaggerSpec = YAML.load("./openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// DB connect
app.get("/api/v1/test-db",async(req,res)=>{
    try{
        const [result] = await db.query(
            "SELECT 1 AS resultado"
        );
        console.log("MYSQL:", result);
        res.status(200).json({
            message: "Conectado correctamente",
            database:result
        })
      
    }
    catch(error){

            console.error("Error al conectar a MySQL:", error);        res.status(500).json({
            message: "Error interno del sistema"
        })
    }
});
// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1",companiesRouter);
app.use("/api/v1",emailRoutes)

app.listen(PORT, ()=> console.log(`Servidor corriendo en http://localhost:${PORT}`));
