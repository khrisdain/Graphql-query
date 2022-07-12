const mongoose = require('mongoose');
const schema = require('../schema/schema');

const clientSchema = new schema({
    name: {
        type: String,
    },

    email: {
        type: String,
    },

    phone: {
        type: String,
    },
});

module.exports = mongoose.model('client', clientSchema);