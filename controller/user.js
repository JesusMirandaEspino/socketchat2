const { response, request } = require( 'express' );
const User = require( '../models/user.js' );
const bcryptjs = require( 'bcryptjs' );



const usersGet = async ( req = request , res = response ) =>  {

   // const { q, nombre = 'No name', apikey, page = 5, limit } = req.query;

    const statusUser = { userStatus: true };
    const { limite = 5, desde = 0 } = req.query;

    /*
    const users = await User.find( statusUser  )
    .skip( Number(desde) )
    .limit( Number(limite) );

    const total = await User.countDocuments( statusUser  );

*/
    const [ total, users ] = await Promise.all( [
        User.countDocuments( statusUser  ),
        User.find( statusUser  ).skip( Number(desde) ).limit( Number(limite) )
    ] );

    res.json( {
        total,
        users
        });
    }

const usersPost = async ( req, res = response ) =>  {


    const { userName, userEmail, userPassword, userRole }= req.body;
    const user = new User( {  userName, userEmail, userPassword, userRole  } );

    //verificar si correo existe


    //Encriptar userPassword
    const salt = bcryptjs.genSaltSync();
    user.userPassword = bcryptjs.hashSync( userPassword, salt );




    //Guardar en DB
    await user.save();

    res.status(201).json( {
        msg: 'Post API',
        user
        });
    }

const usersPut = async ( req, res = response ) =>  {
    const id = req.params.id;
    const { _id ,userPassword, Google, userEmail, ...rest  } = req.body;

    //TODO validar con base de datos
    if( userPassword ){
        //Encriptar userPassword
        const salt = bcryptjs.genSaltSync();
        rest.userPassword = bcryptjs.hashSync( userPassword, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json( {
        msg: 'Put API',
        user
        });
    } 

const usersDelete = async ( req, res = response ) =>  {

    const { id } = req.params;

    const uid = req.uid;
    const userauth = req.user;


    // metodo borrar definitivamente
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { userStatus: false } );

    res.json( {user,  uid, userauth});
    } 
    
const usersPath = ( req, res = response ) =>  {

    res.json( {
        msg: 'Patch API'
        });
    } 


    module.exports = {
        usersGet,
        usersPost,
        usersPut,
        usersDelete,
        usersPath
    };