const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarjwt');

const login = async (req, res = response) => {
    const {correo, password} = req.body;

    try {
        const usuario = await Usuario.findOne({correo});
        if(!usuario) {
            return res.status(400).json( {
                msg: `Usuario / Password incorrectos. (Correo)`
            })
        }

        if(!usuario.estado) {
            return res.status(400).json( {
                msg: `Usuario / Password incorrectos. (Estado false)`
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if( !validPassword ) {
            return res.status(400).json( {
                msg: `Usuario / Password incorrectos. (PAss false)`
            })
        }

        const token = await generarJWT( usuario.id);

        res.json( {
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json( {
            msg: 'Login ok'
        })    
    }

    
}

module.exports = {
    login
}
