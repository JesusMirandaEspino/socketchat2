const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { subirArchivo } = require('../helpers');

const  cloudinary = require('cloudinary').v2

cloudinary.config( process.env.CLOUDINARY_URL );

const { User, Product } = require('../models');



const cargarArchivo = async ( req, res = response ) => {


    console.log( req.files.archivo );

 

        try{

        // imagenes 
        const pathCompleto = await subirArchivo( req.files, undefined, 'img' );

        res.json({ 
            path: pathCompleto
        });

        }catch(msg){
            res.status(400).json({ msg });
        }
} 


const actualizarImagen = async ( req, res = response ) => {



    const { id, coleccion } = req.params;

    let modelo;

    switch( coleccion ){
        case 'users': 
            modelo = await User.findById(id);
            if( !modelo ){ 
                return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }

        break;

        case 'products':
            modelo = await Product.findById(id);
            if( !modelo ){ 
                return res.status(400).json({ msg: `No existe el producto con el id ${id}` });
            }       

        break;



        default:
            return res.status(500).json( { msg: 'Se me olvido validar esto' } );

    }


        //Limpiar imagenes previas
        if( modelo.img ){
            //Hay que borrar la imagen del Servidor
            const pathImagen = path.join( __dirname,  '../uploads', coleccion, modelo.img );
            if( fs.existsSync( pathImagen ) ){
                fs.unlinkSync( pathImagen );
            }

        }


        const pathCompleto = await subirArchivo( req.files, undefined, coleccion );
        modelo.img = pathCompleto;

        await modelo.save();

    res.json({
        modelo
    });
}


const actualizarImagenCloudinary = async ( req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch( coleccion ){
        case 'users': 
            modelo = await User.findById(id);
            if( !modelo ){ 
                return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }

        break;

        case 'products':
            modelo = await Product.findById(id);
            if( !modelo ){ 
                return res.status(400).json({ msg: `No existe el producto con el id ${id}` });
            }       

        break;



        default:
            return res.status(500).json( { msg: 'Se me olvido validar esto' } );

    }


        //Limpiar imagenes previas
        if( modelo.img ){
            //Hay que borrar la imagen del Servidor

            const nombreArr = modelo.img.split('/');
            const nameImg = nombreArr[ nombreArr.length - 1 ];
            const [ public_id ] = nameImg.split('.');
            cloudinary.uploader.destroy( public_id );

        }

        const { tempFilePath } = req.files.archivo;

        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );


        //const pathCompleto = await subirArchivo( req.files, undefined, coleccion );
        modelo.img = secure_url;

        await modelo.save();

    res.json({
        modelo
    });
}



const mostrarImagen = async  ( req, res = response ) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch( coleccion ){
        case 'users': 
            modelo = await User.findById(id);
            if( !modelo ){ 
                return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }

        break;

        case 'products':
            modelo = await Product.findById(id);
            if( !modelo ){ 
                return res.status(400).json({ msg: `No existe el producto con el id ${id}` });
            }       

        break;

        default:
            return res.status(500).json( { msg: 'Se me olvido validar esto' } );

    }

        //Limpiar imagenes previas
        if( modelo.img ){
            //Hay que borrar la imagen del Servidor
            const pathImagen = path.join( __dirname,  '../uploads', coleccion, modelo.img );
            if( fs.existsSync( pathImagen ) ){
                return res.sendFile( pathImagen );
            }
        }

        const pathNoImagen = path.join( __dirname,  '../assets/no-image.jpg' );

        res.sendFile( pathNoImagen );
}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}