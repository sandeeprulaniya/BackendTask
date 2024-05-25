const express = require('express');
const router = express.Router();
const policyController = require('../controllers/policyController');

router.get('/total-policies/:agentId', policyController.getTotalPolicies);
router.get('/total-amount/:agentId', policyController.getTotalAmount);
router.get('/commission/:agentId', policyController.getCommission);
router.get('/commission/policy/:policyType', policyController.getCommissionByPolicyType);

module.exports = router;
