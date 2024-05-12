const User = require("../models/user");
const bcryptService = require("../services/bcryptService");

//Función para obtener todos los usuarios
function getAllUsers(req, res) {
    User.find()
        .then(users => res.json(users))
        .catch(err => {
            console.error(err);
            res.status(500).send("Error al obtener usuarios.")
        })
}

// Función para crear un nuevo usuario
function createUser(req, res) {
    const { nombre, edad, email, contraseña } = req.body;
    User.create({ nombre, edad, email, contraseña })
        .then((newUser) => res.json(newUser))
        .catch(err => {
            console.error(err);
            res.status(500).send("Error al crear usuarios.")
        })
        ;
}

//Función para actualizar un usuario
function updateUser(req, res) {
    // Se obtiene id del usuario a actualizar
    const userId = req.params.id;
    // Se obtiene datos actualizados del body
    const updateUser = req.body;

    // Verificar si la contraseña ha sido modificada
    if (updateUser.contraseña) {
        // Hashear la nueva contraseña
        bcryptService.hashPassword(updateUser.contraseña)
            .then(hashedPassword => {
                // Actualizar la contraseña con el valor hasheado
                updateUser.contraseña = hashedPassword;

                // Actualizar el usuario en la base de datos
                User.findByIdAndUpdate(userId, updateUser, { new: true })
                    .then(user => res.status(200).json(user))
                    .catch(err => {
                        console.error(err);
                        res.status(500).send("Error al actualizar usuario.");
                    });
            })
            .catch(error => {
                console.error(error);
                res.status(500).send("Error al hashear la contraseña.");
            });
    } else {
        // Si la contraseña no ha sido modificada, actualizar el usuario sin hashear la contraseña
        User.findByIdAndUpdate(userId, updateUser, { new: true })
            .then(user => res.status(200).json(user))
            .catch(err => {
                console.error(err);
                res.status(500).send("Error al actualizar usuario.");
            });
    }
}

//Función para elminar usuario
function deleteUser(req, res) {
    const userId = req.params.id;
    User.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send("Usuario eliminado correctamente");
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error al eliminar usuario.")
        });
}

module.exports = { getAllUsers, createUser, updateUser, deleteUser };