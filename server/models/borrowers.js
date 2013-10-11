"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Loan = require('./loans').Loan;

var borrowerSchema = new Schema({
    typeOfBorrower: {type: String, default: 'Individual'},
    name: {type: String, index: true},
    address: { type: String, index: true},
    phoneNumber:{type: String, index: true},
    ein: {type: String, index: true},
    givenName: String,
    email: {type: String, index: true},
    familyName: String,
    homeNumber: {type: String, index: true},
    middleName: String,
    mobileNumber: {type: String, index: true},
    loanId: {type: ObjectId, ref: 'Loan'},
    ssn: String
});


borrowerSchema.set('toJSON', {virtuals: true});

exports.Borrower = conn.model("Borrower", borrowerSchema);