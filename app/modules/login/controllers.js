'use strict';

/* Login Controllers */

angular.module('login.controllers', [])

    .controller('LoginCtrl', ['UserService', '$state', function(us, $state){
        var self = this;
        self.us = us;
        var token = document.getElementById('token').value;
        var sId = document.getElementById('sId').value;
        var sd = {sId: sId, token: token};

        self.login = function(){
            us.authenticate(function(result){
            });

            $http.post('/auth/authenticate', {user: us.user, sd: sd}).success(function(res) {
                if (res.result === 'AUTHENTICATION_SUCCESS') {
                    res.user.authenticated = true;
                    us.save(res.user);
                    ts.startTimer();
                    $state.go("app.dashboard");
                } else if(res.result === 'TEMP_AUTHENTICATION_SUCCESS'){
                    res.user.password = '';
                    us.save(res.user);
                    self.title = 'Reset Password';
                    $state.go('auth.resetPassword');
                    self.showInstructions = true;
                } else{
                    us.user.username = '';
                    us.user.password = '';
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
            $http.post('/auth/sendResetInstructions', {user: us.user, sd: sd}).success(function(res){
                self.successMessage = true;
            });
        };

        self.resetPassword = function(){
            $http.post('/auth/resetPassword', {user: us.user, sd: sd}).success(function(res){
                if(res.result === 'PASSWORD_RESET'){
                    res.user.authenticated = true;
                    $state.go('app.dashboard');
                    us.save(res.user);
                    ts.startTimer();
                }
            });
        };

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


