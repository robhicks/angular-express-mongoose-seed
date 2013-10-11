"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Borrower = require('./borrowers').Borrower;

var loanSchema = new Schema({
    loanAmount: {type: Number, default: 0},
    interestRate: {type: Number, index: true},
    term: {type: Number, index: true},
    paymentType: String
});

exports.Loan = conn.model("Loan", loanSchema);
