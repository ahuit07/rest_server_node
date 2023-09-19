const {response} = require('express');
const { request } = require('http');

const getUsuarios = (req = request, res = response) => {
    const {q, name = 'no name', appkey, page = 1, limit} = req.query;
    res.json({
        msg: 'get API controlador',
        q, 
        name, 
        appkey,
        page,
        limit
    });
  };

const putUsuarios = (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg: 'put API controlador'
    })
  };

const postUsuarios = (req, res) => {
    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API controlador',
        nombre,
        edad
    })
  };

const deleteUsuarios = (req, res) => {
    res.json({
        msg: 'delete API controlador'
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