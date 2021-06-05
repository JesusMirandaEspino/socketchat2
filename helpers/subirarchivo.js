const path = require('path');
const { v4: uuidv4 } = require('uuid');


const subirArchivo = ( files, extensionesValidas = [ 'JPG', 'PNG', 'JPEG', 'GIF' ], carpeta = '' ) => {


    return new Promise( ( resolve, reject ) => {

        //obtener extension del archivo
    const { archivo } = files;
    const shortname = archivo.name.split('.'); 
    const extension = shortname[ shortname.length  - 1 ];


    //validar extension
    if( !extensionesValidas.includes(extension) ){
        return reject( `La extension ${ extension } no es el tipo valida, Las permitidas son ${extensionesValidas}` );
    }


    //mover arhivo a carpeta especifica
    const nameTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join(  __dirname, '../uploads/', carpeta,   nameTemp ) ;

    archivo.mv(uploadPath, (err) =>  {

        if (err) {
        return reject(err);
        }

        resolve(nameTemp);
    });


    } );






}





module.exports = {
    subirArchivo
}