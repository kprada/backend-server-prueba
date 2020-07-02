var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = newSchema({

    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    apellido: { type: String, required: [true, 'El apellido es necesario'] },
    email: { type: String, unique: [true, 'El correo es necesario'] },
    fecha_nacimiento: { type: String, required: [true, 'La fecha de nacimiento es necesario'] },
    pais: { type: String, required: [true, 'El pais es necesario'] },
    ciudad: { type: String, required: [true, 'La ciudad es necesario'] },
    avatar: { type: String, required: false },
    tipo_usuario: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    password: { type: String, required: [true, 'la password es necesario'] },



});

module.export = mongoose.model('Usuario', usuarioSchema);