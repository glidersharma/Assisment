const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    user_id: Number,
    agent: String,
    userType: String,
    policy_mode: String,
    producer: String,
    policy_number: String,
    premium_amount_written: String,
    premium_amount: String,
    policy_type: String,
    company_name: String,
    category_name: String,
    policy_start_date: Date,
    policy_end_date: Date,
    csr: String,
    account_name: String,
    email: String,
    gender: String,
    firstname: String,
    city: String,
    account_type: String,
    phone: String,
    address: String,
    state: String,
    zip: String,
    dob: Date,
    primary: String,
    'Applicant ID': String,
    agency_id: String,
    'hasActive ClientPolicy': String
});

module.exports = mongoose.model('Policy', policySchema);