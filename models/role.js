const { Schema, model } = require('mongoose');


const RoleShema = Schema({
    userRole:{
        type: String,
        required: [ true, 'EL rol es obligatorio' ]
    }

});


module.exports = model( 'Role', RoleShema );    