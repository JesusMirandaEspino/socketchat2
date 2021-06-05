const validarCampos  = require('../middlewares/validar.js');
const validarJWT  = require('../middlewares/validarJWT.js');
const validarRoles = require('../middlewares/validarRoles.js');
const validarArchivo = require('../middlewares/validarArchivo.js');


module.exports = {

    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarArchivo
}