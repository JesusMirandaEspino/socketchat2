const mongoose = require('mongoose');

const dbConection = async () => {

    try{
        mongoose.connect( process.env.MONGODB_CNN, {

            useNewUrlParser:     true,
            useUnifiedTopology:  true,
            useCreateIndex:      true,
            useFindAndModify:    false

        });

        console.log( 'Base de datos en linea' );

    }catch(error){
        console.log( error );
        throw new Error('Error al momento al intentar iniciar a la base de datos');
    }

}


module.exports = {
    dbConection
};