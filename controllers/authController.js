const authService = require("../services/authService");
const AuthToken = require("../models/AuthToken");
const bcryptService = require("../services/bcryptService");
const User = require("../models/user");

//Controlador para manejar la autenticación de usuarios
function login(req, res) {
    const { email, contraseña } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: "Credenciales inválidas" });
            }
            //Comparar la contraseña ingresada por el usuario con la contraseña almacenada en la BD
            bcryptService.comparePassword(contraseña, user.contraseña)
                .then((match) => {
                    if (!match) {
                        return res.status(401).json({ message: "Credenciales Inválidas" });
                    }

                    const token = authService.generateToken(user);
                    //se guarda token en base de datos
                    AuthToken.create({ userId: user._id, token })
                        .then(() => {
                            res.json({ token });
                        })
                        .catch((error) => {
                            res.status(500).json({ message: error });
                        })
                })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Error al iniciar sesión" });
        })
}

//Controlador para cerrar la sesión
function logout(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    //Buscamos el token en la base de datos y lo eliminamos
    AuthToken.findOneAndDelete({token})
        .then(() =>{
            res.status(200).json({ message: "Sesión cerrada con éxito" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Error al cerrar sesión" });
        })
}
module.exports = { login, logout };