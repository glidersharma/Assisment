const csv = require('csvtojson');
const Policy = require('../model/usermodel');
const mongoose = require('mongoose');
const importUser = async (req, res) => {
    try {
        // console.log(req.file.path);
        let userData = [];
        csv().fromFile(req.file.path).then(
            async (res) => {
                for (let i = 0; i < res.length; i++) {
                    // console.log(req);
                    userData.push({
                        user_id: i,
                        agent: res[i].agent,
                        userType: res[i].userType,
                        policy_mode: res[i].policy_mode,
                        producer: res[i].producer,
                        policy_number: res[i].policy_number,
                        premium_amount_written: res[i].premium_amount_written,
                        premium_amount: res[i].premium_amount,
                        policy_type: res[i].policy_type,
                        company_name: res[i].company_name,
                        category_name: res[i].category_name,
                        policy_start_date: res[i].policy_start_date,
                        policy_end_date: res[i].policy_end_date,
                        csr: res[i].csr,
                        account_name: res[i].account_name,
                        email: res[i].email,
                        gender: res[i].gender,
                        firstname: res[i].firstname,
                        city: res[i].city,
                        account_type: res[i].account_type,
                        phone: res[i].phone,
                        address: res[i].address,
                        state: res[i].state,
                        zip: res[i].zip,
                        dob: res[i].dob,
                        primary: res[i].agent,
                        'Applicant ID': res[i]['Applicant ID'],
                        agency_id: res[i].agency_id,
                        'hasActive ClientPolicy': res[i]['hasActive ClientPolicy']
                    })
                }
                console.log(userData);
                await Policy.insertMany(userData)
            }
        )

        res.send({ status: 200, success: true, msg: "fileuploaded" })
    } catch (error) {
        res.send({ status: 400, success: false, msg: "file not uploaded" })
    }
}

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getPolicy = async (req, res) => {
    try {
        // console.log(req.params.id);
        const policy = await Policy.findById(req.params.id);
        if (policy) {
            res.status(200).json(policy);
        } else {
            res.status(400).json({ message: "Not found" });
        }

    } catch (error) {
        // console.log(error);
        res.status(400).json({ message: "Not found" });
    }
};
// @desc Update contact
// @route PUT /api/contacts/:id
// @access private
const updatepolicy = async (req, res) => {

    try {
        console.log(req.params.id);
        const policy = await Policy.findById(req.params.id);
        console.log(policy);
        if (policy) {
            const updatepolicy = await Policy.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            res.status(200).json(updatepolicy);
        } else {
            res.status(400).json({ message: "Record not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};


//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deletePolicy = async (req, res) => {
    try {
        // console.log(req.params.id);
        const policy = await Policy.findById(req.params.id);
        // console.log(policy);
        if (policy) {
            const updatepolicy = await Policy.deleteOne({ _id: req.params.id });
            res.status(200).json(updatepolicy);
        } else {
            res.status(400).json({ message: "Record not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createPolicy = async (req, res) => {
    try {
        console.log("The request body is :", req.body);
        const { email, gender, firstname } = req.body;
        if (!email || !gender || !firstname) {
            res.status(400);
            throw new Error("All fields are mandatory !");
        }
        const policy = await Policy.create({
            email,
            gender,
            firstname,
        });

        res.status(201).json(policy);
    } catch (error) {

        res.status(500).json({ message: "server error" });
    }
};



module.exports = {
    importUser,
    getPolicy,
    updatepolicy,
    deletePolicy,
    createPolicy
}