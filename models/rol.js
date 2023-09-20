const {Schema, model} = require('mongoose');

const RolSquema = Schema ({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

module.exports = model(
    'rol', RolSquema
)