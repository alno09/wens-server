const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const categorySchema = Schema ({
    name: {
        type: String,
        minlength: [3, 'Tidak boleh kurang dari 3 karakter'],
        maxlength: [20, 'tidak boleh lebih dari 20 karakter'],
        required: [true, 'Nama produk harus diisi']
    } 
})

module.exports = model('Category', categorySchema);