"use strict";
let express = require('express'),
    moment = require('moment');

module.exports = function(db) {
    let router = express.Router();
    
    function toMySQLDate(date) {
        if(!date) return null;
        let d = moment(date, ['MM/DD/YYYY']);
        
        if(!d.isValid()) return null;
        return d.toISOString().slice(0, 19).replace('T', ' ');
    }
    
    router.post('/search', function(req, res) {
        let data = req.body;
        let query = [];
        
        //console.log(req.body);
        
        data.HireDate = toMySQLDate(data.HireDate);
        
        if(data.EmployeeID) query.push(`EmployeeID like ${db.escape('%' + data.EmployeeID + '%')}`);
        if(data.FirstName) query.push(`FirstName like ${db.escape('%' + data.FirstName + '%')}`);
        if(data.LastName) query.push(`LastName like ${db.escape('%' + data.LastName + '%')}`);
        
        if(data.HireDate) query.push(`HireDate=${db.escape(data.HireDate)}`);
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
    
    router.get('/list/groups', function(req, res) {
        db.query(`
            SELECT DISTINCT 
            CONCAT(PositionGroupName, ' (', PositionGroupID, ')') AS PositionGroupName, PositionGroupID
            FROM Common_Private.HR_Employee ORDER BY PositionGroupName ASC
        `, function(err, result) {
            res.json(result);
        });
    });
    
    router.get('/list/locations', function(req, res) {
        db.query(`
            SELECT DISTINCT Location, LocationID
            FROM Common_Private.HR_Employee
        `, function(err, result) {
            res.json(result);
        });
    });
    
    router.get('/list/departments', function(req, res) {
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
