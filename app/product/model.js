const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const productSchema = Schema ({
    name: {
        type: String,
        minlength: [3, 'Tidak boleh kurang dari 3 karakter'],
        required: [true, 'Nama produk harus diisi']
    },

    description: {
        type: String,
        maxlength: [1000, 'panjang deskripsi tidak lebih dari 1000 kata']
    },

    price: {
        type: Number,
        default: 0
    },

    image_url: String,

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    
}, { timestamps: true })

module.exports = model('Product', productSchema);