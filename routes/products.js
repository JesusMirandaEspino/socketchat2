const { Router } = require( 'express' );
const { check } = require('express-validator');
const { crearProduct, obtenerProduct, obtenerProducts, actualizarProduct, borrarProduct  } = require('../controller/product.js');
const { existeCategoryPorId, existeProductPorId    } = require('../helpers/db-validators.js');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();


// Obtener todas los productos - publico
    router.get('/', obtenerProducts);

// Obtener un producto por id - publico
    router.get('/:id', [  
        check('id', 'No es un id de mongo').isMongoId(),
        check('id').custom( existeProductPorId    ),
        validarCampos
    ], obtenerProduct );


// Crear un producto- privado cualquier persona con un token valido
    router.post('/', [
        validarJWT,
        check('productname', 'El nombre es obligatorio').not().isEmpty(),
        check('category', 'No es un id de mongo').isMongoId(),
        check('category').custom(existeCategoryPorId),
        validarCampos
    ], crearProduct  );

// Actualizar el producto- privado cualquier persona con un token valido
    router.put('/:id', [
        validarJWT,
        check('category', 'No es un id de mongo').isMongoId(),
        check('id').custom( existeProductPorId   ),
        validarCampos
    ] , actualizarProduct );

// Borrar categoria Admin
    router.delete('/:id', [
        validarJWT,
        esAdminRole,
        check('id', 'No es un id de mongo').isMongoId(),
        check('id').custom( existeProductPorId ),
        validarCampos
    ] , borrarProduct  );


module.exports = router; 