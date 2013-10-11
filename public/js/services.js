'use strict';

/* Services */


// Demonstrate how to register services
angular.module('myApp.services', [])

    .factory('Loan', function($resource){
        return $resource('/rest/loan/:id', {}, {
            query:  {method: 'GET', isArray: true},
            get:    {method: 'GET'},
            remove: {method: 'DELETE'},
            edit:   {method: 'PUT'},
            add:    {method: 'POST'}
        });
    })

    .factory('Borrower', function($resource){
        return $resource('/rest/borrower/:id', {}, {
            query:  {method: 'GET', isArray: true},
            get:    {method: 'GET'},
            remove: {method: 'DELETE'},
            edit:   {method: 'PUT'},
            add:    {method: 'POST'}
        });
    });
