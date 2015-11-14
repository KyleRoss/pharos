# Beam API

## Endpoints
The following endpoints are availabe through the API.

### App Endpoints
#### `GET` /app/beacons
Get full list of beacons in the database.

Returns [Object]

#### `GET` /app/locations
Get full list of locations in database.

Returns [Object]

#### `GET` /app/location/:bid
Get the location of a beacon by its UUID.

`:bid` - The UUID for the beacon.

Returns Object

#### `POST` /app/lastSeen
Checkin a user to a given location.

* `employeeID` - The ID of the employee who is checking in.
* `locationID` - The ID of the location to checkin to.

Returns Number (the ID of the row)


#### `POST` /app/checkin
Checkin a user to a given location.

* `employeeID` - The ID of the employee who is checking in.
* `locationID` - The ID of the location to checkin to.

Returns Object

```javascript
{
    checkinID: 1, // The ID of the checkin
    pending: [] // Array of objects of checkins that are still not ended for the given employee
}
```

#### `POST` /app/checkout
Checkout a user for a given location.

* `id` - The ID of the checkin to checkout of.

Returns `true`

---

### Employee Endpoints
#### `POST` /employees/search
Find employee(s) based on search criteria. If no criteria is provided, all employees will be returned.

* `EmployeeID` - The employee ID to search for (like)
* `FirstName` - First name to search for (like)
* `LastName` - Last name to search for (like)
* `HireDate` - Hire date for employee `MM/DD/YYYY` (exact)
* `CompanyID` - The ID of the company to search within (exact)
* `LocationID` - The ID of the location to search within (exact)
* `JobTitleID` - The ID of the job title to search within (exact)
* `PositionGroupID` - The ID of the position group to search within (exact)
* `AgentTitleID` - The ID of the agent title to search within (exact)
* `IsSalesSupport` - Boolean true or false to search sales support only
* `IsActive` - Boolean true or false to show active employees only

Returns [Object]

#### `GET` /employees/list/groups
Get a list of position groups from the database.

Returns [Object]

#### `GET` /employees/list/locations
Get a list of employee building locations from the database.

Returns [Object]

#### `GET` /employees/list/departments
Get a list of departments from the database.

Returns [Object]

---

### Web Endpoints
#### `GET` /web/beaconsInLocation/:id
Get a list of beacons from within a given location

Returns [Object]

#### `GET` /web/usersInLocation/:id
Get a list of users in a given location

Returns [Object]

#### 'GET' /web/getBeaconLocation/:id
Get the location data for a beacon

#### 'GET' /web/getDashboardData
Get the dashboard data

Returns [Object]

---

### Web Socket Events
#### get dashboard data
Emit this event to begin receiving live dashboard data

#### dashboard data loaded
Listen for this event. It will return the live data
