const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const tagSchema = Schema({
    name: {
        type: String,
        minlength: [3, "tidak boleh kurang dari 3 karakter"],
        maxlength: [20, "tidak boleh lebih dari 20 karakter"],
        required: [true, "nama harus diisi"]
    }
})

module.exports = model('Tag', tagSchema);