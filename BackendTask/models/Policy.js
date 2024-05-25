const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
    policyNumber: String,
    policyType: String,
    premium: Number,
    agentId: String,
});

module.exports = mongoose.model('Policy', PolicySchema);
