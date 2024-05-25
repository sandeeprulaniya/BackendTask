const xlsx = require('xlsx');
const User = require('../models/User');
const Policy = require('../models/Policy');
const Agent = require('../models/Agent');



// uploading and reading excel file 
exports.uploadFile = async (req, res) => {
    const file = req.file;
    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);


    // saving data to database

    for (const item of data) {
        let agent = await Agent.findOne({ agentID: item["Agent ID"] });
        if (!agent) {
            agent = new Agent({
                name: item["Agent Name "],
                agentID: item["Agent ID"],
                commissionRates: {
                    lifeInsurance: 0.07,
                    twoWheeler: 0.06,
                    threeWheeler: 0.06,
                    fourWheeler: 0.1
                }
            });
            await agent.save();
        }

        let user = await User.findOne({ email: item["Agent Email"] });

        if (!user) {
            user = new User({
                name: item["Agent Name "],
                email: item["Agent Email"],
            });
            await user.save();
        }

        const policy = new Policy({
            policyNumber: item["Policy ID"],
            policyType: item["Policy Type"],
            premium: item["Premium Amount"],
            agentId: item["Agent ID"]
        });
        await policy.save();
    }
    console.log('Data saved successfully');
    res.json({ message: 'File processed successfully', data });
};
