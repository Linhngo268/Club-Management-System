var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a club manager resource');
});

router.get('/get_rsvps', function (req, res, next) {
  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
      res.sendStatus(500);
      return;
    }
    const { event_id } = req.query;
    let query = `
    SELECT
    first_name, last_name
    FROM
    Users
    INNER JOIN EventRSVPs ON Users.id = EventRSVPs.user_id
    INNER JOIN ClubEvents ON EventRSVPs.event_id = ClubEvents.id
    WHERE
    ClubEvents.id = ?;
    `;

    // Query the database
    connection.query(query, [event_id], function (query_err, rows, fields) {
      // Release the connection as we have our results
      connection.release();

      // Error check
      if (query_err) {
        res.sendStatus(500);
        return;
      }

      // Send the result, I do not care if there are no results
      res.send(JSON.stringify(rows));
    });
  });
});

router.get('/get_members', function (req, res, next) {
  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
      res.sendStatus(500);
      return;
    }
    const { club_id } = req.query;
    let query = `
    SELECT
    first_name, last_name, email, phone_number
    FROM
    Users
    INNER JOIN ClubMembers ON Users.id = ClubMembers.user_id
    INNER JOIN Clubs ON ClubMembers.club_id = Clubs.id
    WHERE
    Clubs.id = ?;
    `;

    // Query the database
    connection.query(query, [club_id], function (query_err, rows, fields) {
      // Release the connection as we have our results
      connection.release();

      // Error check
      if (query_err) {
        res.sendStatus(500);
        return;
      }

      // Send the result, I do not care if there are no results
      res.send(JSON.stringify(rows));
    });
  });
});

router.post('/update_description', function (req, res, next) {
  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
      // console.error(connection_err);
      res.sendStatus(500);
      return;
    }

    const { club_id } = req.query;
    const { new_description } = req.body;

    let query = `
    UPDATE Clubs
    SET description = ?
    WHERE id = ?;
    `;

    // Query the database
    connection.query(query, [new_description, club_id], function (query_err, rows, fields) {
      // Release the connection as we have our results
      connection.release();

      // Error check
      if (query_err) {
        // console.error(query_err);
        res.sendStatus(500);
        return;
      }

      // Check if the user was added successfully
      if (rows.affectedRows === 1) {
        // User was added successfully
        res.sendStatus(200);
      } else {
        // User was not added
        // console.error("Insert appears to have failed");
        res.sendStatus(500);
      }
    });
  });
});

module.exports = router;
