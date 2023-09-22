const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res = response, next) => {
    const token = req.header('x-token')

    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la aplicación'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECORPUBKEY);

        req.uid = uid;
        const usuarioAutenticado = await Usuario.findById(uid);

        if( !usuarioAutenticado ) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe'
            })
        }

        if( !usuarioAutenticado.estado ) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario Estado: False'
            })
        }

        req.usuarioAutenticado = usuarioAutenticado
        console.log(uid);

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido'
        })
    }
    console.log(token);
    next();
}

module.exports = { 
    validarJWT
}