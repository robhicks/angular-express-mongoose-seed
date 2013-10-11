'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

    .controller('AppCtrl', function ($scope, $http, $state) {
        $state.go('root.main.loans');
    })

    .controller('LoanCtrl', ['$scope', '$state', 'Loan', function ($scope, $state, Loan) {
        var self = this;
        self.edit = false;
        self.data = {};
        self.data.loans = [];
        self.data.loan = {};

        Loan.query(function(res){
            self.data.loans = res;
        });

        self.addLoan = function(){
            Loan.add({}, function(res){
                self.data.loan = res;
                self.edit = true;
            });
        };

        self.editLoan = function(index){
            Loan.get({id: self.data.loans[index]._id}, function(res){
                self.data.loan = res;
                self.edit = true;
            });
        };

        self.getLoans = function(){
          Loan.query(function(res){
              self.data.loans = res;
              self.edit = false;
          });
        };

        self.deleteLoan = function(){
            Loan.delete({id: self.data.loan._id}, function(){
                Loan.query(function(res){
                    self.data.loans = res;
                    self.edit = false;
                });
            });
        };

        self.updateLoan = function(){
            Loan.edit({loanData: self.data.loan}, function(){
                Loan.query(function(res){
                    self.data.loans = res;
                    self.edit = false;
                });
            });
        };
    }])

    .controller('BorrowerCtrl', ['$scope', '$state', 'Loan', 'Borrower', function ($scope, $state, Loan, Borrower) {
        var self = this;
        self.edit = false;
        self.data = {};
        self.data.borrowers = [];
        self.data.borrower = {};
        self.data.loans = [];

        Borrower.query(function(res){
            self.data.borrowers = res;
        });

        self.addBorrower = function(){
            Borrower.add({}, function(res){
                self.data.borrower = res;
                Loan.query(function(res){
                    self.data.loans = res;
                    self.edit = true;
                });
            });
        };

        self.editBorrower = function(index){
            Borrower.get({id: self.data.borrowers[index]._id}, function(res){
                self.data.borrower = res;
                Loan.query(function(res){
                    self.data.loans = res;
                    self.edit = true;
                });
            });
        };

        self.getBorrowers = function(){
            Borrower.query(function(res){
                self.data.borrowers = res;
                self.edit = false;
            });
        };

        self.deleteBorrower = function(){
            Borrower.delete({id: self.data.borrower._id}, function(){
                Borrower.query(function(res){
                    self.data.borrowers = res;
                    self.edit = false;
                });
            });
        };

        self.updateBorrower = function(){
            Borrower.edit({borrowerData: self.data.borrower}, function(){
                Borrower.query(function(res){
                    self.data.borrowers = res;
                    self.edit = false;
                });
            });
        };

        self.getBorrowers = function(){
            Borrower.query(function(res){
                self.data.borrowers = res;
                self.edit = false;
            });
        };

    }]);


