'use strict';

module.exports = function(server, db) {
    let io = require('socket.io').listen(server);
    
    io.on('connection', function(socket){
        socket.on('get dashboard data', function(){
            function updateInterval() {
                db.query(`
                    SELECT 
                        u.id,
                        u.employeeID,
                        CONCAT(e.FirstName, ' ', e.LastName) AS employeeName,
                        e.JobTitle AS jobTitle,
                        e.EmployeePhoto AS employeePhoto,
                        CASE
                            WHEN u.type=0
                                THEN 'lastSeen'
                            ELSE
                                'checkin'
                        END AS type,
                        u.startTime,
                        u.endTime,
                        l.name AS location,
                        l.description AS locationDescription,
                        f.floor,
                        f.name AS floorName,
                        b.name AS buildingName,
                        b.description AS buildingDescription
                    FROM Beam.UserLocationStats u
                    LEFT JOIN Common_Private.HR_Employee AS e ON e.EmployeeID=u.employeeID
                    LEFT JOIN Beam.Locations AS l ON l.id=u.locationID
                    LEFT JOIN Beam.Floors AS f ON l.floorID=f.id
                    LEFT JOIN Beam.Buildings AS b on b.id=f.buildingID
                    LIMIT 20
                `, (err, result) => {
                    socket.emit('dashboard data loaded', result);
                    
                    setTimeout(function() {
                        updateInterval();
                    }, 1000);
                });
            }
        
            updateInterval();
        });
        
        socket.on('disconnect', function() {
            console.log('Socket Disconnected');
        });

        console.log('Socket Connected');
    });
};
