const response = require('express');


const esAdminRole = ( req, res = response, next ) => {

    if( !req.user ){
        return res.status(500).json( {
            msg: 'Se requiere validar el rol antes de verificar el token'
        } );
    }
    const { userRole, userName  }  = req.user;

    if( userRole !== 'ADMIN_ROLE' ){
        return res.status(401).json( {
            msg: `El ${userName}  No tiene suficientes permisos ` 
        } );
    }

    next();

}

const tieneRole = ( ...roles ) => {
    return ( req, res = response, next  ) => {

        if( !req.user ){
            return res.status(500).json( {
                msg: 'Se requiere validar el rol antes de verificar el token'
            } );
        }


        if( !roles.includes( req.user.userRole ) ){
            return res.status(401).json( {
                msg: `El servicio requiere uno de estos roles ${roles}`
            } );
        }


        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}