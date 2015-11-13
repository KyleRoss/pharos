"use strict";
let express = require('express');

module.exports = function(db) {
    let router = express.Router();
    
    router.get('/getAllLocations', function(req, res) {
        db.query(`
            SELECT DISTINCT Location, LocationID
            FROM Common_Private.HR_Employee
        `, function(err, result) {
            res.json(result);
        });
    });
    
    router.get('/getAllDepartments', function(req, res) {
        db.query(`
            SELECT DISTINCT HomeDepartment, HomeDepartmentID
            FROM Common_Private.HR_Employee
            ORDER BY HomeDepartment ASC
        `, function(err, result) {
            res.json(result);
        });
    });
    
    return router;
};
