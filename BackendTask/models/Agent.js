const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    name: String,
    agentID: String,
    commissionRates: {
        lifeInsurance: Number,
        twoWheeler: Number,
        threeWheeler: Number,
        fourWheeler: Number
    }
});

module.exports = mongoose.model('Agent', AgentSchema);
