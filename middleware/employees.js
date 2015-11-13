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
    
    router.post('/getEmployee', function(req, res) {
        let data = req.body;
        let query = [];
        
        console.log(req.body);
        
        if(data.EmployeeID) query.push(`EmployeeID like ${db.escape('%' + data.EmployeeID + '%')}`);
        if(data.FirstName) query.push(`FirstName like ${db.escape('%' + data.FirstName + '%')}`);
        if(data.LastName) query.push(`LastName like ${db.escape('%' + data.LastName + '%')}`);
        if(data.PhoneNumber) query.push(`WorkFromHomeStation like ${'%' + db.escape(data.PhoneNumber + '%')}`);
        if(data.HireDate) query.push(`HireDate like ${db.escape('%' + data.HireDate + '%')}`);
        
        if(data.CompanyID) query.push(`CompanyID=${db.escape(data.CompanyID)}`);
        if(data.LocationID) query.push(`LocationID=${db.escape(data.LocationID)}`);
        if(data.JobTitleID) query.push(`JobTitleID=${db.escape(data.JobTitle)}`);
        if(data.PositionGroupID) query.push(`PositionGroupID=${db.escape(data.PositionGroupID)}`);
        if(data.AgentTitleID) query.push(`AgentTitleID=${db.escape(data.AgentTitle)}`);
        if(data.IsSalesSupport) query.push(`JobTitleTypeID=9`);
        if(data.IsActive) query.push(`IsActive=1`);
        
        let q = `
            SELECT * FROM Common_Private.HR_Employee
            ${query.length? 'WHERE ' + query.join(' AND ') : ''}
        `;
        
        //console.log(q);
        
        db.query(q, function(err, result) {
            res.json(result);
        });
    });
    
    return router;
};
