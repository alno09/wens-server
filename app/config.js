const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

module.exports = {
    rootPath: path.resolve(__dirname, '..'),
    uri: process.env.URI,
    secretkey: process.env.SECRET_KEY
}