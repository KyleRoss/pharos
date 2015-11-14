'use strict';

module.exports = (db) => {
    let express = require('express'),
        router = express.Router();
    
    router.get('/beaconsInLocation/:id', (req, res, next) => {
        let locationId = req.params.id;
        
        db.query(`
            SELECT
                b.id AS beaconID,
                b.name AS beaconName,
                l.name AS locationName,
                l.description AS locationDescription
            FROM Beam.Beacons b
            LEFT JOIN Beam.Locations AS l ON l.id = b.locationID
            WHERE l.id=${db.escape(locationId)}
        `, (err, result) => {
            if(err) return res.json({ error: 'ERROR!!!!' });
            res.json(result);
        });
    });
    
    router.get('/usersInLocation/:id', (req, res, next) => {
        let locationId = req.params.id;
        
        db.query(`
            SELECT
                e.FirstName,
                e.LastName,
                u.startTime,
                u.endTime,
                CASE
                    WHEN u.type = 0
                        THEN 'lastSeen'
                    ELSE
                        'checkin'
                END AS type,
                e.JobTitle,
                e.PositionGroupName
            FROM Beam.UserLocationStats u
            LEFT JOIN Beam.Locations AS l ON l.id = u.locationID
            LEFT JOIN Common_Private.HR_Employee as e ON e.EmployeeID = u.employeeID
            WHERE l.id=${db.escape(locationId)}
        `, (err, result) => {
            if(err) return res.json({ error: 'ERROR!!!!' });
            res.json(result);
        });
    });
    
    return router;
};
