const mongoose = require('mongoose');
const {uri} = require('../app/config');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, writeConcern: { w: 'majority' } });
const db = mongoose.connection

module.exports = db;