import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
console.log("Configuración MySQL:");
console.log("HOST:", process.env.DB_HOST);
console.log("PORT:", process.env.DB_PORT);
console.log("USER:", process.env.DB_USER);
console.log("DATABASE:", process.env.DB_NAME);
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,

    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});

export default db;