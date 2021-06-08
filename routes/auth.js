const { Router } = require( 'express' );
const { check } = require('express-validator');

const { validarJWT, validarCampos  } = require('../middlewares');


const { login, googleSignIng, renovarToken } = require('../controller/auth');


const router = Router();

    router.post( '/login', [
        check( 'userEmail', 'El correo es obligatorio' ).isEmail(),
        check('userPassword', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ] ,  login  );

    router.post( '/google', [
        check('id_token', 'El id_token es obligatorio').not().isEmpty(),
        validarCampos,
        googleSignIng
    ] ,  login  );


    router.get('/', validarJWT, renovarToken );





module.exports = router; 