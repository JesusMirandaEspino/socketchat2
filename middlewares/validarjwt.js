const { response, request } = require( 'express' )
const jwt =  require('jsonwebtoken');


const User = require('../models/user.js');

const validarJWT = async  (    req = request ,  res = response, next  ) => {
    
    const token = req.header( 'x-token' );

    if( !token ){
        return res.status(401).json({
            msg: 'No hay Token en la peticion'
        });
    }


    try{

      //   jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    const { uid }  = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    const user = await User.findById( uid );


        if(!user){
            return res.status(401).json({
                msg: 'Token no valido  - Usuario no existe base de datos'
        }); 
        }


        // Verificar si el usuario no esta dado de baja

        if( !user.userStatus ){
            return res.status(401).json({
                msg: 'Token no valido  - usuario con estado: false'
        });    
        }


    req.user = user;
    req.uid = uid;

        next();

    }catch( err ){
        console.log( err );
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

    console.log( token );



}



module.exports = {
    validarJWT
}