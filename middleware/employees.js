"use strict";
let express = require('express');

module.exports = function(db) {
    let router = express.Router();
    
    router.get('/getAllEmployees', function(req, res) {
        db.query(`
            SELECT * FROM Common_Private.HR_Employee
            WHERE IsActive=1
            ORDER BY EmployeeID ASC
        `, function(err, result) {
            res.json(result);
        });
    });
    
    router.get('/getPositionGroups', function(req, res) {
        db.query(`
            SELECT DISTINCT 
            CONCAT(PositionGroupName, ' (', PositionGroupID, ')') AS PositionGroupName, PositionGroupID
            FROM Common_Private.HR_Employee ORDER BY PositionGroupName ASC
        `, function(err, result) {
            res.json(result);
        });
    });
    
    // router.post('/getEmployee', function(req, res) {
    //     let data = req.body;
    //     let query = [];
        
    //     if(data.FirstName) query.push(`FirstName like '%${data.FirstName}%'`);
    //     if(data.LastName) query.push(`LastName like '%${data.LastName}%'`);
        
    //     db.query(`
    //         SELECT * FROM Common_Private.HR_Employee
    //         WHERE ${thaDee.firstName ? 'FirstName=' + thaDee.FirstName : ''}
    //     `);
        
    //     res.json({ data: 'single employee' });
    // });
    
    return router;
};
