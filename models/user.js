const mongoose = require("mongoose");
const bcryptService = require("../services/bcryptService");

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    }
});
//Hasheo de contraseña
userSchema.pre("save", function (next) {
    if (!this.isModified("contraseña")) {
        return next();
    }
    bcryptService
    .hashPassword(this.contraseña)
    .then(hashedPassword => {
        this.contraseña = hashedPassword;
        next();
    })
    .catch(error => {
        console.error(error);
        next(error);
    })
});


//Creación de modelo user utilizando el esquema
const User = mongoose.model("User", userSchema);

module.exports = User;