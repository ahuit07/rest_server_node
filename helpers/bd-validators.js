const RolSquema  = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    console.log('Rol: ' + rol);
    const existeRol = await RolSquema.findOne({ rol: rol });
    console.log('Rol: ' + existeRol);
    if (existeRol) {
        throw new Error(`El rol ${rol}, no esta registrado en la base de datos.`);
    }
}

const emailExist = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo ${correo} ya registrado`);
      }
}

const existeUsuarioPorId = async(id = '') => {
    const existeUsusario = await Usuario.findById(id);
    if ( !existeUsusario ) {
        throw new Error(`El usuario con el id: ${id} no existe`);
      }
}

module.exports = {
    esRolValido,
    emailExist,
    existeUsuarioPorId
}