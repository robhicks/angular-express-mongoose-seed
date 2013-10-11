'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
        'ngResource',
        'ui.router',
        'myApp.controllers',
        'myApp.filters',
        'myApp.services',
        'myApp.directives'
    ])

    .config(function ($locationProvider, $urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            //Authentication
            .state('root', {url: "/", abstract: true, templateUrl: "/"})
            .state('root.main', {url: '', templateUrl: "/partials/main", controller: 'AppCtrl'})
            .state('root.main.loans', {url: '/loans', templateUrl: "/partials/loans"})
            .state('root.main.borrowers', {url: '/borrowers', templateUrl: "/partials/borrowers"})
    })

    .run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParms = $stateParams;
    });
