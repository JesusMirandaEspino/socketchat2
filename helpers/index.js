const dbValidators = require('./db-validators');
const generarJWT = require('./generarJWT');
const googleVerify = require('./googleVerify');
const subirArchivo = require('./subirarchivo');


module.exports = {
    ...dbValidators, 
    ...generarJWT, 
    ...googleVerify,
    ...subirArchivo
}