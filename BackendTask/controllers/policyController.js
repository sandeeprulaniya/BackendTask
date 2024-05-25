const Policy = require('../models/Policy');
const Agent = require('../models/Agent');


// get total number of policies sold by a agent
exports.getTotalPolicies = async (req, res) => {
    try {
        const { agentId } = req.params;
        const agent = await Agent.findOne({ agentID: agentId });
        
        const name = agent.name;

        const count = await Policy.countDocuments({ agentId });
        res.json({ agentId, name, totalPoliciesSoldByAgent: count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// get total amount of policies sold by a agent
exports.getTotalAmount = async (req, res) => {
    try {
        const { agentId } = req.params;

        const agent = await Agent.findOne({ agentID: agentId });
        const name = agent.name;

        const policies = await Policy.find({ agentId });
        const totalAmount = policies.reduce((sum, policy) => sum + policy.premium, 0);
        res.json({ agentId,name, totalAmount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// get total commission and policy wise commission earned by an agent
exports.getCommission = async (req, res) => {
    try {
        const { agentId } = req.params;
        const agent = await Agent.findOne({ agentID: agentId });

        
        
        const name = agent.name;

        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        const policies = await Policy.find({ agentId });
        const commissionRates = agent.commissionRates;
        const commissionData = {};
        let totalCommission = 0;

        policies.forEach(policy => {
            const { policyType, premium } = policy;
            const commissionRate = commissionRates[policyType];

            if (commissionRate !== undefined) {
                const commission = premium * commissionRate;
                totalCommission += commission;
                if (!commissionData[policyType]) {
                    commissionData[policyType] = 0;
                }
                commissionData[policyType] += commission;
            }
        });

        res.json({ agentId,name, commissionData, totalCommission });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



//get totalCommissoin earned , total policies sold and total amount earned by policy type
exports.getCommissionByPolicyType = async (req, res) => {
    try {
        const { policyType } = req.params;

        const agent = await Agent.findOne({ agentID: 1 });
        const policies = await Policy.find({ policyType });
        const commissionRates = agent.commissionRates;
        let totalCommission = 0;
        let totalPoliciesSold = 0;
        let totalAmountEarned = 0;

        policies.forEach(policy => {
            const { premium } = policy;
            const commissionRate = commissionRates[policyType];

            if (commissionRate !== undefined) {
                const commission = premium * commissionRate;
                totalCommission += commission;
                totalPoliciesSold++;
                totalAmountEarned += premium;
            }
        });

        res.json({ policyType, totalCommission, totalPoliciesSold, totalAmountEarned });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
