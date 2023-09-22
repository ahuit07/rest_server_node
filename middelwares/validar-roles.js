const {response} = require('express');

const esAdminRol = (req, res = response, next) => {

    if(!req.usuarioAutenticado) {
        return res.status(500).json({
            msg: 'No se ha validado el token antes de validar el rol'
        });
    }

    const {rol, nombre} = req.usuarioAutenticado;
    if(rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${nombre} no es administrador`  
        });
    }

    next();
}

const tieneRol = (...roles) => {
    return (req, res = response, next) => {
        if(!req.usuarioAutenticado) {
            return res.status(500).json({
                msg: `Se quiere verificar el rol sin el token`  
            });
        }
        if(!roles.includes(req.usuarioAutenticado.rol)){
            return res.status(401).json({
                msg: `El usuario ${req.usuarioAutenticado.nombre} no tiene permisos para eliminar`  
            });
        }
        next();
    }
}

module.exports = {
    esAdminRol,
    tieneRol
}