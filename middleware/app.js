'use strict';

module.exports = (db) => {
    let express = require('express'),
        router = express.Router();
    
    router.get('/beacons', (req, res, next) => {
        db.query(`SELECT * FROM Beam.Beacons`, (err, result) => {
            if(err) return res.json({ error: 'ERROR!!!!' });
            res.json(result);
        });
    });
    
    router.get('/locations', (req, res, next) => {
        db.query(`SELECT * FROM Beam.Locations`, (err, result) => {
            if(err) return res.json({ error: 'ERROR!!!!' });
            res.json(result);
        });
    });
    
    router.get('/location/:bid', (req, res, next) => {
        let bid = req.params.beaconID;
        
        db.query(`
            SELECT
                l.id,
                l.name
            FROM Beam.Locations l
            LEFT JOIN Beacons AS b ON b.locationID=l.id
            WHERE b.uid=${db.escape(bid)}
        `, (err, result) => {
            if(err) return res.json({ error: 'ERROR!!!!' });
            res.json(result[0]);
        });
    });
    
    router.post('/checkin', (req, res, next) => {
        let locationID = req.body.locationID,
            employeeID = req.body.employeeID;
        
        db.query(`
            INSERT INTO Beam.UserLocationStats
            (
                employeeID,
                locationID,
                startTime
            )
            VALUES (
                ${db.escape(employeeID)},
                ${db.escape(locationID)},
                NOW()
            )
        `, (err, result) => {
            db.query(`SELECT id, locationID FROM Beam.UserLocationStats WHERE endTime IS NULL AND employeeID=${db.escape(employeeID)}`, (err, rows) => {
                res.json({
                    checkinID: result.lastInsertId,
                    pending: rows
                });
            });
        });
    });
    
    router.post('/checkout', (req, res, next) => {
        let id = req.body.id;
        
        db.query(`
            UPDATE Beam.UserLocationStats
            SET endTime=NOW()
            WHERE id=${db.escape(id)}
        `, (err, result) => {
            res.json(true);
        });
    });
    
    return router;
};
