/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
var express = require('express');
var router = express.Router();

/* GET user resource */
router.get('/', function(req, res, next) {
  res.send('respond with a user resource');
});

/*
GET request for club updates.
Returns updates form clubs a user is a part of.
*/
router.get('/get_updates', function (req, res, next) {
  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
        console.error(connection_err);
        res.sendStatus(500);
      return;
    }

    // Form our query
    let query = `
    SELECT ClubUpdates.name, ClubUpdates.description, ClubUpdates.posted
    FROM ClubUpdates

    INNER JOIN  Clubs       ON ClubUpdates.club_id  = Clubs.id
    INNER JOIN  ClubMembers ON Clubs.id             = ClubMembers.club_id

    WHERE ClubMembers.user_id = ?

    ORDER BY ClubUpdates.posted DESC;
    `;

    // Get the user id
    const user_id = 1; // I have no idea how to get this as of right now

    // Query the database
    connection.query(query, [user_id], function (query_err, rows, fields) {
      // Release the connection as we have our results
      connection.release();

      // Error check
      if (query_err) {
        console.error(query_err);
        res.sendStatus(500);
        return;
      }

      // Send the result, I do not care if there are no results
      res.send(JSON.stringify(rows));
    });
  });
});

/*
GET request for club events.
Returns updates form clubs a user is a part of.
*/
router.get('/get_events', function (req, res, next) {
  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
        console.error(connection_err);
        res.sendStatus(500);
      return;
    }

    // Form our query
    let query = `
    SELECT ClubEvents.name, ClubEvents.description, ClubEvents.happening
    FROM ClubEvents

    INNER JOIN Clubs        ON ClubEvents.club_id = Clubs.id
    INNER JOIN ClubMembers  ON Clubs.id           = ClubMembers.club_id

    WHERE ClubMembers.user_id = ?
    AND   ClubEvents.happening > NOW()

    ORDER BY ClubEvents.happening ASC;
    `;

    // Get the user id
    const user_id = 1; // I have no idea how to get this as of right now

    // Query the database
    connection.query(query, [user_id], function (query_err, rows, fields) {
      // Release the connection as we have our results
      connection.release();

      // Error check
      if (query_err) {
        console.error(query_err);
        res.sendStatus(500);
        return;
      }

      // Send the result, I do not care if there are no results
      res.send(JSON.stringify(rows));
    });
  });
});

// Handle form submission for new events


module.exports=router;
