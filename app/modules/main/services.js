'use strict';

/* Services */

angular.module('main.services', [])

    .service('UserService', ['$http', 'localStorageService', function($http, lss){
        var us = {};
        us.user = {};
        us.user.authenticated = false;

        us.authenticate = function(sd, cb){
            $http.post('/auth/api/authenticate', {user: us.user, sd: sd}).success(function(res) {
                if (res.result === 'AUTHENTICATION_SUCCESS') {
                    res.user.authenticated = true;
                    us.save(res.user);
                    if(cb) return cb(res.result);
                } else if(res.result === 'TEMP_AUTHENTICATION_SUCCESS'){
                    res.user.password = '';
                    us.save(res.user);
                    if(cb) return cb(res.result);
                } else{
                    us.user.username = '';
                    us.user.password = '';
                    if(cb) return cb(null);
                }
            });
        };

        us.sendResetInstructions = function(sd, cb){
            $http.post('/auth/api/sendResetInstructions', {user: us.user, sd: sd}).success(function(res){
                if(cb) return cb();
            });
        };

        us.resetPassword = function(sd, cb){
            $http.post('/auth/api/resetPassword', {user: us.user, sd: sd}).success(function(res){
                if(res.result === 'PASSWORD_RESET'){
                    res.user.authenticated = true;
                    us.save(res.user);
                    if(cb) return cb('SUCCESS');
                } else {
                    if(cb) return cb('FAILURE');
                }
            });
        };


        us.loadUserFromStorage = function(){
            var user = lss.get('local_user')
            us.user = user ? user : {};
        };

        us.isAuthenticated = function () {
            var user = lss.get('local_user');
            if (user && user.authenticated) {
                us.user = user;
                return true;
            } else {
                return false;
            }
        };

        us.destroy = function () {
            if(lss.get('local_user')){
                $http.post('/auth/api/logoutUser', {user: us.user});
                lss.clearAll();
                us.user = {};
                us.user.authenticated = false;
            }
        };

        us.save = function (user){
            lss.add('local_user', user);
            us.user = user;
        };

        us.getUsers = function(filter, cb){
            $http.post('/users/getUsers', filter).success(function(res){
                cb(res.users);
            });
        };

        us.addUser = function(user, cb){
            $http.post('/users/addUser', {user: user}).success(function(res){
                cb(res.users);
            });
        };

        us.updateUser = function(user, cb){
            $http.post('/users/updateUser', {user: user}).success(function(res){
                return cb(res.user);
            });
        };

        us.deleteUser = function(user, cb){
            $http.post('/users/deleteUser', {user: user}).success(function(res){
                return cb(res.users);
            });
        };

        us.storeCurrentLoan = function(loan, cb){
            us.user.currentLoan = loan;
            lss.add('local_user', us.user);
            if(cb) cb();
        };

        return us;
    }]);
