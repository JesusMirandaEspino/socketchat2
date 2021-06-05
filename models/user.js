const { Schema, model  } = require( 'mongoose' );


const userShema = Schema({ 
    userName: { 
        type: String,
        required: [ true, 'EL nombre es obligatorio' ]
    },

    userEmail: {
        type: String,
        required: [ true, 'EL nombre es obligatorio' ],
        unique: true
    },

    userPassword: {
        type: String,
        required: [ true, 'La contraseña es obligatoria' ],
    },

    userRole: {
        type: String,
        require: true,
        //enum: [ 'ADMIN_ROLE', 'USER_ROLE' ]
    },

    userStatus: {
        type: Boolean,
        default: true
    },
    
    Google: {
        type: Boolean,
        default: false
    }, 
    
    img: {
        type: String
    }

}); 



userShema.methods.toJSON = function(){
    const { __v, userPassword, _id,  ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', userShema );


/*

        "userName": "test15",
        "userEmail": "test15@dominio.com",
        "userPassword": "48156446huidisfhs&",
        "userRole":  "USER_ROLE",
        "userStatus":  true,
        "Google": false


*/ 