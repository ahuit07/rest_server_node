const {response} = require('express');
const { request } = require('http');
const bcryptjs = require('bcryptjs'); 
const Usuario = require('../models/usuario');

const getUsuarios = async (req = request, res = response) => {
    //const {q, name = 'no name', appkey, page = 1, limit} = req.query;
    const { limite = 5, desde = 0} = req.query;
    const query = { estado: true }
    /*const usuarios = await Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite));
    const total = await Usuario.countDocuments(query);*/

    const [ usuarios, total ] = await Promise.all([Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite)),
      Usuario.countDocuments(query)
    ]);

    res.json({
        total,
        usuarios
    });
  };

const putUsuarios = async(req, res = response) => {
    const {id} = req.params;
    const {password, google, correo,...resto} = req.body;
    if(password) {
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    
    res.json({
        usuario
    })
  };

const postUsuarios = async(req, res) => {

    const{nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    await usuario.save();

    res.json({
        msg: 'post API controlador',
        usuario
    })
  };

const deleteUsuarios = async (req, res) => {

    const {id} = req.params;

    const uid = req.uid;

    const usuarioAutenticado = req.usuarioAutenticado;

    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}); 
    res.json({
        id,
        uid,
        usuario,
        usuarioAutenticado
    })
  };

const patchUsuarios = (req, res) => {
    res.json({
        msg: 'patch API controlador'
    })
  };

module.exports = {
    getUsuarios,
    putUsuarios,
    postUsuarios,
    deleteUsuarios,
    patchUsuarios
  }