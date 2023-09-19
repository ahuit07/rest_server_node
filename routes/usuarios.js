const {Router} = require('express');
const usuariosController = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosController.getUsuarios);

router.put('/:id', usuariosController.putUsuarios);

router.post('/', usuariosController.postUsuarios);

router.delete('/', usuariosController.deleteUsuarios);

router.patch('/', usuariosController.patchUsuarios);

module.exports = router;