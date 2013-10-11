"use strict";

var Loan = require('../models/loans').Loan;
var Borrower = require('../models/borrowers').Borrower;

exports.loan = function (req, res){
    var method = req.method;
    var id = req.params.id;
    if(method === 'GET' && id) return getLoan(id, res);
    else if(method === 'PUT') return updateLoan(req.body.loanData, res);
    else if(method === 'POST') return createLoan(req.body.data, res);
    else if(method === 'DELETE') return deleteLoan(id, res);
    else return getLoans(res);
};

exports.borrower = function (req, res){
    var method = req.method;
    var id = req.params.id;
    if(method === 'GET' && id) return getBorrower(id, res);
    else if(method === 'PUT') return updateBorrower(req.body.borrowerData, res);
    else if(method === 'POST') return createBorrower(req.body.data, res);
    else if(method === 'DELETE') return deleteBorrower(id, res);
    else return getBorrowers(res);
};

//Loan API
function getLoan(id, res){
    Loan.findById(id, function(err, loan){
        res.json(loan);
    });
}

function updateLoan(loanData, res){
    var id = loanData._id;
    delete loanData._id;
    delete loanData.borrowers;
    Loan.findByIdAndUpdate(id, loanData, function(err, loan){
        res.json(loan);
    });
}

function createLoan(data, res){
    var loanData = data ? data : {};
    Loan.create(loanData, function(err, loan){
        if(err) console.log(err);
        res.json(loan);
    });
}

function deleteLoan(id, res){
    Loan.findByIdAndRemove(id, function(err, loan){
        res.json(loan);
    });
}

function getLoans(res){
    Loan.find({},function(err, loans){
        res.json(loans);
    });
}

//Borrower API
function getBorrower(id, res){
    Borrower.findById(id, function(err, borrower){
        res.json(borrower);
    });
}

function updateBorrower(borrowerData, res){
    var id = borrowerData._id;
    delete borrowerData._id;
    Borrower.findByIdAndUpdate(id, borrowerData, function(err, borrower){
        res.json(borrower);
    });
}

function createBorrower(data, res){
    var borrowerData = data ? data : {};
    Borrower.create(borrowerData, function(err, borrower){
        if(err) console.log(err);
        res.json(borrower);
    });
}

function deleteBorrower(id, res){
    Borrower.findByIdAndRemove(id, function(err, borrower){
        res.json(borrower);
    });
}

function getBorrowers(res){
    Borrower.find({},function(err, borrowers){
        res.json(borrowers);
    });
}

