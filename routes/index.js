/* eslint-disable no-useless-return */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const http = require('http');
const socketIO = require('socket.io');
const { connect } = require('http2');



const app = express();
const server = http.createServer(app);
const io = socketIO(server);
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* This is merely an example and does not need to be here when all is finished */
router.get('/db_example_get_all_names', function (req, res, next) {
  // Used to retreive all the names and usernames of all users in the database
  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
      res.sendStatus(500);
      return;
    }

    // Form our query
    let query = "SELECT first_name, last_name, username FROM Users";

    // Query the database
    connection.query(query, function (query_err, rows, fields) {
      // Release the connection as we have our results
      connection.release();

      // Error check
      if (query_err) {
        res.sendStatus(500);
        return;
      }

      // Check if exists
      if (rows.length > 0) {
        // Results found
        res.send(JSON.stringify(rows));
      } else {
        // No results found
        res.sendStatus(404);
      }
    });
  });
});

router.post('/db_example_create_user', function (req, res, next) {
  // Get the user data from the request body
  const {
    first_name, last_name, username, email, password, phone_number
  } = req.body;

  // Check if everything looks correct
  // console.log(first_name, last_name, username, email, password, phone_number);
  if (first_name === "") {
    res.sendStatus(400);
    return;
  }
  if (last_name === "") {
    res.sendStatus(400);
    return;
  }
  if (username === "") {
    res.sendStatus(400);
    return;
  }
  if (email === "") {
    res.sendStatus(400);
    return;
  }
  if (password === "") {
    res.sendStatus(400);
    return;
  }
  if (phone_number === "") {
    res.sendStatus(400);
    return;
  }

  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
      res.sendStatus(500);
      return;
    }

    // Form our query to insert a new user
    let query = "INSERT INTO Users (first_name, last_name, username, email, password, phone_number) VALUES (?, ?, ?, ?, ?, ?)";

    // Query the database to insert the new user
    connection.query(
      query,
      [first_name, last_name, username, email, password, phone_number],
      function (query_err, result) {
        // Release the connection as we have our results
        connection.release();

        // Error check
        if (query_err) {
          res.sendStatus(500);
          return;
        }

        // Check if the user was added successfully
        if (result.affectedRows === 1) {
          // User was added successfully
          res.sendStatus(200);
        } else {
          // User was not added
          res.sendStatus(500);
        }
      }
    );
  });
});

/* End example code */
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
      res.sendStatus(500);
      return;
    }

    // Form our query
    let query = "SELECT id, first_name, last_name, username, is_admin FROM Users WHERE email LIKE ? AND password LIKE ?";

    // Query the database
    connection.query(query, [email, password], function (query_err, rows, fields) {
      // Release the connection as we have our results
      connection.release();

      // Error check
      if (query_err) {
        res.sendStatus(500);
        return;
      }

      // Check if exists
      if (rows.length > 0) {
        req.cookies.logged_in = true;
        res.sendStatus(200);
      }

    });

  });
});

router.post('/login_check', (req, res, next) => {
  if (req.cookies.logged_in === true) {
  console.log(req.cookies);
  }
  if (req.cookies.logged_in) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401); // Redirect to login page or any other appropriate page
  }
});





router.post('/sign_up', (req, res, next) => {
  // Get the user data from the request body
  const {
    first_name, last_name, username, email, password, phone_number
  } = req.body;

  // Check if everything looks correct
  // console.log(first_name, last_name, username, email, password, phone_number);
  if (first_name === "") {
    res.sendStatus(400);
    return;
  }
  if (last_name === "") {
    res.sendStatus(400);
    return;
  }
  if (username === "") {
    res.sendStatus(400);
    return;
  }
  if (email === "") {
    res.sendStatus(400);
    return;
  }
  if (password === "") {
    res.sendStatus(400);
    return;
  }
  if (phone_number === "") {
    res.sendStatus(400);
    return;
  }

  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
      res.sendStatus(500);
      return;
    }

    // Form our query to insert a new user
    let query = "INSERT INTO Users (first_name, last_name, username, email, password, phone_number) VALUES (?, ?, ?, ?, ?, ?)";

    // Query the database to insert the new user
    connection.query(
      query,
      [first_name, last_name, username, email, password, phone_number],
      function (query_err, result) {
        // Release the connection as we have our results
        connection.release();

        // Error check
        if (query_err) {
          res.sendStatus(500);
          return;
        }

        // Check if the user was added successfully
        if (result.affectedRows === 1) {
          // User was added successfully
          res.sendStatus(200);
        } else {
          // User was not added
          res.sendStatus(500);
        }
      }
    );
  });
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'salihmarwan6@gmail.com',
    pass: 'ymddorcqytvygzxw'
  }
});

function generateToken(length = 20) {
  let token = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
}


router.post('/reset_password', (req, res) => {
  const { email, username } = req.body;

  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
      res.sendStatus(500);
      return;
    }
    // Check if the email exists in your database
    let query = 'SELECT * FROM Users WHERE email LIKE ? AND username LIKE ?';

    connection.query(query, [email, username], function (query_err, rows) {
      // Release the connection as we have our results
      connection.release();

      // Error check
      if (query_err) {
        res.sendStatus(500);
      }

      if (rows.length === 0) {
        // Email doesn't exist in the database
        res.sendStatus(404);
      } else {
        return res.sendStatus(200);
      }
    });

    let token = generateToken();
    query = 'UPDATE Users SET reset_token = ? WHERE email = ?';

    connection.query(query, [token, email], function (query_err, rows) {
      connection.release();
      if (query_err) {
        console.error(query_err);
        return res.sendStatus(500);
      }

      const htmlContent = `
        <h1><strong> Confirmation Passowrd Reset </strong></h1>
        <h2> Your Password has been reset </h2>
        <br>
        <h3><strong>If you did not intend to reset your password, please contact us at: salihmarwan6@gmail.com </strong></h3>
        <br>
        <h3>If you did intend to reset your password, please ignore this email</h3>
        <br>
        <p>Kind regards, <br> University Of Adelaide Clubs Support Team</p>
        `;
      const mailOptions = {
        from: 'salihmarwan6@gmail.com',
        to: email,
        subject: 'Password Reset Confrimed :)',
        html: htmlContent
      };

      transporter.sendMail(mailOptions, function (query_err) {
        if (query_err) {
          console.error(query_err);
          res.sendStatus(500);
          return;
        }
        token = null;
        return res.sendStatus(200);
      });
    });
  });



});

/*
GET request for all the clubs.
*/
router.get('/get_all_clubs', function (req, res, next) {
  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
      res.sendStatus(500);
      return;
    }

    // Form our query
    let query = "SELECT id, name, description FROM Clubs";

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

/*
GET request for club updates
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
    SELECT name, description, posted
    FROM ClubUpdates
    ORDER BY posted DESC;
    `;

    // Query the database
    connection.query(query, function (query_err, rows, fields) {
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
GET request for club events
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
    SELECT name, description, happening
    FROM ClubEvents
    WHERE happening > NOW()
    ORDER BY happening ASC;
    `;

    // Query the database
    connection.query(query, function (query_err, rows, fields) {
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
GET requests for club information
*/

router.get('/get_clubinfo', function (req, res, next) {
  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
      res.sendStatus(500);
      return;
    }
    const { club_id } = req.query;
    let query = `
    SELECT
    name, description
    FROM
    Clubs
    WHERE
    id = ?;
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

router.get('/get_eventinfo', function (req, res, next) {
  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
      res.sendStatus(500);
      return;
    }
    const { club_id } = req.query;
    let query = `
    SELECT
    id, name, description, happening
    FROM
    ClubEvents
    WHERE
    club_id = ?;
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
      console.log(JSON.stringify(rows));
    });
  });
});

router.get('/get_eventupdates', function (req, res, next) {
  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
      res.sendStatus(500);
      return;
    }
    const { club_id } = req.query;
    let query = `
    SELECT
    id, name, description, posted
    FROM
    ClubUpdates
    WHERE
    club_id = ?;
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
router.post('/new_admin', (req,res,next) => {
  // Get the user data from the request body
  const {
    first_name,last_name, username, admin_id, phone,email, password
  } = req.body;

req.pool.getConnection(function (connection_err, connection) {
  // Error check
  if (connection_err) {
    res.sendStatus(500);
    return;
  }

  // Form our query to insert a new user
  let query = "INSERT INTO Users (first_name,last_name, username,email, password,phone_number, is_admin) VALUES (?, ?, ?, ?, ?, ?,?)";

  // Query the database to insert the new user
  connection.query(
    query,
    [first_name, last_name, username, email,password, phone, admin_id],
    function (query_err, result) {
      // Release the connection as we have our results
      connection.release();

      // Error check
      if (query_err) {
        res.sendStatus(500);
        return;
      }
     // Check if the user was added successfully
     if (result.affectedRows === 1) {
      // User was added successfully
      res.sendStatus(200);
    } else {
      // User was not added
      res.sendStatus(500);
    }
  }
);
});
});

// Route to check if the user is signed in
router.get('/check_signed_in', function (req, res) {
  return res.sendStatus(200);
});

router.post('/event', (req, res) => {
  const { name, description, happening } = req.body;

  req.pool.getConnection((connection_err, connection) => {
    if (connection_err) {
      console.error('Error establishing database connection:', connection_err);
      res.sendStatus(500);
      return;
    }

    const query = 'INSERT INTO ClubEvents (club_id, name, happening, description) VALUES (?, ?, ?, ?)';
    const values = [1, name, happening, description];

    connection.query(query, values, (query_err, result) => {
      connection.release();

      if (query_err) {
        console.error('Error executing database query:', query_err);
        res.sendStatus(500);
        return;
      }

      if (result.affectedRows === 1) {
        // Event was added successfully
        res.sendStatus(200);
      } else {
        // Event was not added
        res.sendStatus(500);
      }
    });
  });
});


// Handle form submission for new updates
router.post('/update', (req, res) => {
  const { updates } = req.body;

  // Perform validation on the form data
  req.pool.getConnection(function (connection_err, connection) {
    if (connection_err) {
      return res.sendStatus(500);
    }
    // Insert the new update into the database
    let query = 'INSERT INTO ClubUpdates (club_id, description) VALUES (?, ?)';
    let values = [1, updates];

    connection.query(query, values, (error, results) => {
      if (error) {
        res.sendStatus(500);
      } else {
        return res.sendStatus(200);

      }
    });
  });
});


module.exports = router;
