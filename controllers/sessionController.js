const user = require("../models/user");

//Obtener info de usuario que ha iniciado sesión
function getCurrentUser(req, res) {
    new Promise((resolve, reject) => {
        //El middleware de atuch ya almacena el id del usuario
        const userId = req.userId;

        //Busca el usuario en la base de datos utilizando apis
        user.findById(userId)
            .then(user => {
                if (!user) {
                    reject({ status: 404, message: "Usuario no encontrado" })
                } else {
                    resolve(user)
                }
            })
            .catch(error => reject({status: 500, message:"Error al obtener información del usuario", error}));
    })
    .then((user) => res.json(user))
    .catch((error) => {
        res.status(error.status || 500).json({message: error.message});
    })
}

module.exports ={getCurrentUser};