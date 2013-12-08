"use strict";

exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('module_2/' + name);
};

exports.api = function (req, res) {
    var api = req.params.api;
    switch(api){

    }
};