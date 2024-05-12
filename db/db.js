const mongoose = require("mongoose");

//Conexión de db
const mongoURL = "mongodb+srv://diany1712csb:JucQRScWLPgYPhKb@cluster0.06duikz.mongodb.net/proyect"

function connectDB() {
    return new Promise((res, req) => {
        mongoose
            .connect(mongoURL)
            .then(() => {
                console.log("Conexión a la DB  exitosa");
                res();
            })
            .catch((err) => {
                console.error("Error al conectar a la DB ", err);
                req(err);
            });
    })
}
module.exports = connectDB;