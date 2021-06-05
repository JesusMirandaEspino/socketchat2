const express = require( 'express' );
const cors = require('cors')
const fileUpload  = require('express-fileupload');
const { createServer } = require('http');

const { dbConection } = require( '../database/config.js' );
const { socketController } = require('../sockets/controllers');


//TODO clase server 
class Server {

constructor(){

    //variables para asignar express
    this.app = express();
    this.port = process.env.PORT;

    this.server = createServer( this.app );
    this.io     = require( 'socket.io' )(this.server);

    this.paths = {
        auth:        '/api/auth',
        buscar:      '/api/buscar',
        categorias:  '/api/categorias',
        products:    '/api/products',
        usuarios:    '/api/users',
        uploads:    '/api/uploads',

        
    }


    //Conectar a Base de datos
    this.conectarDB();

    //middlewares
    this.middlewares();

    this.routes();

    // sockets
    this.sockets();

}


async conectarDB(){
    await dbConection();
}

middlewares(){

    //cors
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use( express.json() );

    //directorio publico
    this.app.use( express.static( 'public' ) );

    //fileupload carga de archivos
    this.app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
        ,createParentPath: true
    }));


}

routes(){

    this.app.use(   this.paths.auth,        require('../routes/auth') );
    this.app.use(   this.paths.categorias,  require('../routes/categorias') );
    this.app.use(   this.paths.buscar,      require('../routes/buscar') );
    this.app.use(   this.paths.uploads,      require('../routes/uploads') );
    this.app.use(   this.paths.products,    require('../routes/products') );
    this.app.use(   this.paths.usuarios,    require('../routes/user') );
}


    sockets(){
        this.io.on("connection", socketController );
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }


}



module.exports = Server;