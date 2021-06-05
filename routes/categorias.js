const { Router } = require( 'express' );
const { check } = require('express-validator');
const { crearCategory, obtenerCategories, obtenerCategory, actualizarCategory, borrarCategory  } = require('../controller/category.js');
const { existeCategoryPorId   } = require('../helpers/db-validators.js');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();


// Obtener todas las categorias - publico
    router.get('/', obtenerCategories );

// Obtener una categoria por id - publico
    router.get('/:id', [  
        check('id', 'No es un id de mongo').isMongoId(),
        check('id').custom( existeCategoryPorId   ),
        validarCampos
    ], obtenerCategory );


// Crear una categoria - privado cualquier persona con un token valido
    router.post('/', [
        validarJWT,
        check('categoryname', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ], crearCategory  );

// Actualizar la categoria - privado cualquier persona con un token valido
    router.put('/:id', [
        validarJWT,
        check('categoryname', 'El nombre es obligatorio').not().isEmpty(),
        check('id').custom( existeCategoryPorId   ),
        validarCampos
    ] , actualizarCategory );

// Borrar categoria Admin
    router.delete('/:id', [
        validarJWT,
        esAdminRole,
        check('id', 'No es un id de mongo').isMongoId(),
        check('id').custom( existeCategoryPorId ),
        validarCampos
    ] , borrarCategory );


module.exports = router; 