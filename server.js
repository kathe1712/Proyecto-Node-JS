const express = require("express");
const connectDB = require("./db/db");

//Importación de rutas
const authRoutes = require ("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const sessionRoutes = require ("./routes/sessionRoutes");

//Instancia de express
const app = express();
const PORT = 3010;

//Middleware para que parsee los datos del body
app.use(express.json());

//Rutas de autenticación
app.use("/api/auth", authRoutes);

//Rutas de usuario
app.use("/api/users", userRoutes);

//Rutas del usuario actual
app.use("/api/session", sessionRoutes);

//DB
connectDB()

//Inicialización del servidor y se lo pone en escucha
app.listen(PORT, ()=>{
    console.log("Servidor corriendo en puerto: "+ PORT);
})