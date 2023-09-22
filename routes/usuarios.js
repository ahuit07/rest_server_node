const {Router} = require('express');
const {check} = require('express-validator');
const usuariosController = require('../controllers/usuarios');
const { error } = require('console');
const { esRolValido,
        emailExist,
        existeUsuarioPorId } = require('../helpers/bd-validators');

//const { validarCampos } = require('../middelwares/validar-campos');
//const { validarJWT } = require('../middelwares/validar-jwt');
//const { esAdminRol, tieneRol } = require('../middelwares/validar-roles');
const {
    validarCampos,
    validarJWT,
    esAdminRol, 
    tieneRol
} = require('../middelwares')

const router = Router();

router.get('/', usuariosController.getUsuarios);

router.put('/:id', [
    check('id','El id no es valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
],
usuariosController.putUsuarios);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y debe de ser de minímo 6 letras').not().isEmpty().isLength({min:6}),
    check('correo','El correo no es válido').isEmail(),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo').custom(emailExist),
    check('rol').custom(esRolValido),
    
    validarCampos
], usuariosController.postUsuarios);

router.delete('/:id',[
    validarJWT,
    //esAdminRol,
    tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','El id no es valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],
 usuariosController.deleteUsuarios);

router.patch('/', usuariosController.patchUsuarios);

module.exports = router;