"use strict";

exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('profile/' + name);
};

exports.api = function (req, res) {
    var api = req.params.api;
    switch(api){

    }
};