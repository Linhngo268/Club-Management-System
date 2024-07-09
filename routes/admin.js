var express = require('express');
var router = express.Router();

/* GET admin resource */
router.get('/', function (req, res, next) {
  res.send('respond with an admin resource');
});

/*
GET request for all the users.
*/
router.get('/get_all_users', function (req, res, next) {
  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
      res.sendStatus(500);
      return;
    }

    // Form our query
    let query = "SELECT id, first_name, last_name, username FROM Users";

    // Query the database
    connection.query(query, function (query_err, rows, fields) {
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

module.exports = router;

