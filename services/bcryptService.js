const bcrypt = require("bcrypt");
// Para hashear contraseña
function hashPassword(plainPassword){
    return new Promise((resolve, reect) => {
        const saltRounds = 10;
        bcrypt.hash(plainPassword, saltRounds, (error, hashedPassword) =>{
            if(error){
                PromiseRejectionEvent(new Error("Error al hashear la contraseña"));
            }
            else{
                resolve(hashedPassword);
            }
        })
    })
}

// Comparar una contraseña con contraseña encriptada
function comparePassword(plainPassword, hashedPassword){
    return new Promise((resolve, reject) =>{
        bcrypt.compare(plainPassword, hashedPassword, (error, match)=>{
            if (error){
                reject(new Error("Error al comparar contraseñas"));
            }
            else{
                resolve(match);
            }
        })
    })
}

module.exports = { hashPassword, comparePassword};