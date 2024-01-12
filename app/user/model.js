const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const crypt = require('bcrypt');

let userSchema = mongoose.Schema({
        full_name: {
            type: String,
            required: [true, 'nama harus diisi'],
            minlength: [3, 'panjang nama harus antara 3 - 255 karakter'],
            maxlength: [255, 'panjang nama harus antara 3 - 255 karakter']
        },

        customer_id: {
            type: Number,
        },

        email: {
            type: String,
            required: [true, 'email harus diisi'],
            maxlength: [255, 'email tidak boleh lebih dari 255 karakter']
        },

        password: {
            type: String,
            required: [true, 'password harus diisi'],
            maxlength: [255, 'password tidak boleh lebih dari 255 kata']
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },

        token: [String]

}, {timestamp: true})

// pembuatan input email
userSchema.path('email').validate(function(value) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
}, attr => `${attr.value} harus menggunakan email yang valid`);

// validasi inputan email
// userSchema.path('email').validate(async function(value) {

//     try {
//         const count = await this.model('User').count({email: value});
    
//         return !count;
//     } catch(err) {
//         throw err;
//     }
    
// }, attr => `${attr.value} sudah terdaftar`);


// hashing password
const HASH_ROUND = 10;
userSchema.pre('save', function(next) {
    this.password = crypt.hashSync(this.password, HASH_ROUND);
    next()
});

// pembuatan auto increment
userSchema.plugin(AutoIncrement, {inc_field: 'customer_id'});

module.exports = mongoose.model('User', userSchema);