'use strict';

/* Auth Controllers */

angular.module('auth.controllers', [])

    .controller('AuthCtrl', ['UserService', '$state', '$timeout', function(us, $state, $timeout){
        var self = this;
        self.us = us;
        var token = document.getElementById('token').value;
        var sId = document.getElementById('sId').value;
        var sd = {sId: sId, token: token};

        self.login = function(){
            us.authenticate(sd, function(result){
                if(result === 'AUTHENTICATION_SUCCESS') $state.go('module1.main');
                else if(result === 'TEMP_AUTHENTICATION_SUCCESS') $state.go('auth.resetPassword');
                else {
                    self.message = true;
                    self.title = 'Invalid Credentials!';
                    $timeout(function(){
                        self.message = false;
                        self.title = null;
                    },3000);
                }
            });
        };

        self.sendResetInstructions = function(){
            us.sendResetInstructions(sd, function(){
                self.successMessage = true;
            });
        };

        self.resetPassword = us.resetPassword(function(result){
            if(result === 'SUCCESS') $state.go('app.module1');
        });

        self.showResetCredentials = function(){
            self.title = 'Reset Instructions';
            self.successMessage = false;
        };

        self.showLogin = function(){
            us.user.username = '';
            us.user.password = '';
            us.user.tempPassword = '';
            self.title = null;
            self.legals = false;
        };

        self.showCreateAccount = function(){
            self.title = "Create Account";
        };

        self.showTerms = function(){
            self.title = "Terms & Conditions";
            self.legals = true;
        };

        self.showPrivacy = function(){
            self.title = "Privacy Terms & Conditions";
            self.legals = true;
        };
    }]);


