const { Schema, model } = require('mongoose');


const ProductShema = Schema({
    productname:{
        type: String,
        required: [ true, 'EL nombre es obligatorio' ],
        unique: true
    },
    productystatus: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: { 
        type: String 
    },
    available: {
        type: Boolean,
        dafault: true
    },
    img: {
        type: String,   
    }

});


ProductShema.methods.toJSON = function(){
    const { __v, userStatus,   ...data } = this.toObject();
    return data;
}



module.exports = model( 'Product', ProductShema );    