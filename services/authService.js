const jwt = require("jsonwebtoken");

// Se almacena clave secreta
const JWT_SECRET = "b3f38599d5ba51c9a80e1ad98b62108bf4fdfe1ac26dbbeb801ae71a63e717a1";

//Función para generar token jwt
function generateToken(user){
    const payload = {
        userId: user._id,
        email: user.email
    }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h"});
    return token;
}

module.exports = {generateToken};