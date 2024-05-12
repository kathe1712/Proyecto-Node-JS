const jwt = require("jsonwebtoken");
 
function verifyToken(req, res, next){
    return new Promise((resolve, reject) => {
        const token = req.headers.authorization;
        if (!token) {
            reject({ status: 401, message: "Token de autenticación no proporcionado" });
        }
    
        jwt.verify(token.split(" ")[1], "b3f38599d5ba51c9a80e1ad98b62108bf4fdfe1ac26dbbeb801ae71a63e717a1",
            (error, decodedToken) => {
                if (error) {
                    reject({ status: 401, message: "Token de autenticación no válido" });
                }
                else {
                    req.userId = decodedToken.userId // Se agrega IG de usuario.
                    resolve();
                }
            }
        );
    
    })
    .then ( ()=> next())
    .catch((error) => res.status(error.status || 500).json({message:error.message}));
}

module.exports = verifyToken;