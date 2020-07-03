var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var rolesValidos = {
    values: ['ADMIN_USER', 'USER_CLIENT'],
    message: '{VALUE} no es un rol permitido'
}

var usuarioSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    apellido: { type: String, required: [true, 'El apellido es necesario'] },
    email: { type: String, unique: [true, 'El correo es necesario'] },
    fecha_nacimiento: { type: String, required: [true, 'La fecha de nacimiento es necesario'] },
    pais: { type: String, required: [true, 'El pais es necesario'] },
    ciudad: { type: String, required: [true, 'La ciudad es necesario'] },
    avatar: { type: String, required: false, default: null },
    tipo_usuario: {
        type: String,
        required: true,
        default: 'USER_CLIENT',
        enum: rolesValidos
    },
    password: { type: String, required: [true, 'la password es necesario'] },



});
usuarioSchema.plugin(uniqueValidator, { message: ' {PATH} el correo ya existe' })

module.exports = mongoose.model('Usuario', usuarioSchema);