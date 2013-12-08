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
        'LoginModule'
    ])

    .config(function ($locationProvider, $urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('login', {url: "/", abstract: true, templateUrl: "/"})
            .state('login.main', {url: '', templateUrl: "/login/partials/main"})
    })

    .run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParms = $stateParams;
    });
