'use strict';

// Declare app level module which depends on filters, and services

angular.module('main', [
        'ngAnimate',
        'ui.router',
        'LocalStorageModule',
        'main.controllers',
        'main.filters',
        'main.services',
        'main.directives',
        'AuthModule',
        'Module1Module',
        'Module2Module'
    ])

    .config(function ($locationProvider, $urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/auth");
        $stateProvider
            .state('auth', {url: "/auth", abstract: true, templateUrl: "/auth/partials/main"})
            .state('auth.login', {url: '', templateUrl: "/auth/partials/login"})
            .state('auth.createAccount', {url: "/create_account", templateUrl: "/auth/partials/create_account"})
            .state('auth.resetCredentials', {url: "/reset_credentials", templateUrl: "/auth/partials/reset_credentials"})
            .state('auth.resetPassword', {url: "/reset_password", templateUrl: "/auth/partials/reset_password"})
            .state('auth.terms', {url: '/terms', templateUrl: "/auth/partials/terms"})
            .state('auth.privacy', {url: '/privacy', templateUrl: "/auth/partials/privacy"})

            .state('module1', {url: "/", abstract: true, templateUrl: "/module_1"})
            .state('module1.main', {url: '', templateUrl: "/module_1/main"})
    })

    .config(function ($httpProvider) {
        var interceptor = [ '$q', '$rootScope', function ($q, $rootScope) {
            function success(response) {
                //console.log('success response', response.status);
                return response;
            }

            function error(response) {
                var status = response.status;
                var deferred = $q.defer();

                if (status === 401) {
                    $rootScope.$state.go('auth.login');
                    // //console.log('http interceptor error', status);
                    // $rootScope.$broadcast('event:user_unauthorized');

                    return deferred.promise;
                } else {
                    return $q.reject(response);
                }
            }

            return function (promise) {
                //console.log('interceptor promise: ' + promise);
                return promise.then(success, error);
            };
        }];
        $httpProvider.responseInterceptors.push(interceptor);
    })

    .run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParms = $stateParams;
    });
