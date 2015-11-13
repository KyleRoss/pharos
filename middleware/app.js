module.exports = (db) => {
    let express = require('express'),
        router = express.Router();
    
    router.post('/getLocation', (req, res, next) => {
        let bid = req.body.beaconID;
        
        db.query(`
            
        `, (err, result) => {
            
        });
    });
};
