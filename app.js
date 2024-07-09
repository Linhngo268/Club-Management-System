
/* eslint-disable no-multi-spaces */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var clubManagerRouter = require('./routes/club_manager');
var adminRouter = require('./routes/admin');
var session = require('express-session');
const nodemailer = require('nodemailer');


var app = express();
app.set('port', 8080);

app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Creating the connection pool
var dbConnectionPool = mysql.createPool({
  host: 'localhost',
  database: 'IanKnightAppreciationDB'
});

const query = util.promisify(dbConnectionPool.query).bind(dbConnectionPool);

// Allowing the database to be used in request handling
app.use(function (req, res, next) {
  req.pool = dbConnectionPool;
  next();
});

// MARWIN'S PART!!!!!!!

// module.exports = app;
/* eslint-disable no-console */
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// Allowing the database to be used in request handling
app.use(function (req, res, next) {
  req.pool = dbConnectionPool;
  next();
});

app.use(session({
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // Set to true if using HTTPS
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
  }
}));

let Email = "";

app.post('/login', (req, res) => {
  const { email, password, keepSignedIn } = req.body;
  req.pool.getConnection(function (connection_err, connection) {
    // Error check
    if (connection_err) {
      res.sendStatus(500);
      return;
    }

    // Form our query
    let login_query = "SELECT first_name, last_name, username FROM Users WHERE email LIKE ? AND password LIKE ?";

    // Query the database
    connection.query(login_query, [email, password], function (query_err, rows, fields) {
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
        console.log(email, password);
        res.sendStatus(200);
        req.session.user = { email: email };
        Email = email;

        if (keepSignedIn) {
          req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Extend session expiry to 30 days
        }
      } else {
        // No results found
        console.log(email, password);
        res.sendStatus(401);
      }
    });
  });
});
// end of marwin's part


// LYN'S PART FOR USER'S FUNCTION
//  when user press reserve, they will receive email sent to their account
const emaildetails = [];
app.get('/events/:eventId', function (req, res) {
  const { eventId } = req.params;
  // Query the database for the event information using the event ID
  dbConnectionPool.query('SELECT * FROM ClubEvents WHERE club_id = ? LIMIT 1', [eventId], function (error, results) {
    if (error) throw error;
    // Send the retrieved event data as a JSON response
    res.json(results[0]);
    emaildetails[0] = results[0];
    console.log(emaildetails[0]);
  });
});

// sending emails

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'phuonglinh.ngo2608@gmail.com',
    pass: 'mvgqfgaglrispwug'
  }
});
var firstname=[];
var lastname=[];
const username=[];

app.post('/reserveEvent1', async (req, res) => {
  const {
 id, name, happening, description
} = req.body;
  console.log(id);
  if (!id || !name || !happening || !description) {
    res.status(400).json({ error: 'Invalid event details' });
    return;
  }
  if (Email.trim() === '') {
    console.log('Username is empty. Email not sent.');
return;
  }
  const query = 'INSERT INTO EventRSVPs (user_id, event_id) SELECT Users.id, ClubEvents.id FROM Users INNER JOIN ClubMembers ON ClubMembers.user_id = Users.id INNER JOIN ClubEvents ON ClubEvents.club_id = ClubMembers.club_id WHERE Users.email = ? AND ClubEvents.id = ?;';
  const values = [Email,id];
  dbConnectionPool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting database connection:', err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }

    connection.query(query, values, (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error inserting reservation:', error);
        res.status(500).json({ message: 'Error recording reservation' });
        return;
      }

      res.status(200).json({ message: 'Reservation recorded successfully' });
    });
  });

    var now = new Date();
    var date = now.toDateString();
    var time = now.toTimeString();


  var datetime = date + ' ' + time;
  const html = fs.readFileSync('users/club_page.html', 'utf8');


  try {
    const user = req.session.user;
    if (user) {
      const Username =  query('SELECT first_name, last_name FROM Users WHERE email=? LIMIT 1;', [user.email]);
      const userObj = Username[0];
      if (userObj) {
        const { first_name, last_name } = userObj;
        const username = { first_name, last_name };

        res.json({ username });
        console.log({ username });
      } else {
        // Handle case when no user is found
        res.sendStatus(404);
      }
    } else {
      // User is not authenticated, return an error
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }


  const htmlContent = `
<h1><strong> Confirmation Email </strong></h1>
<p> Thank you ${Email} for reserving for this event</p>
<p>The reservation details are below</p>
<p>Event ID: ${id}</p>
      <p>Event Name: ${name}</p>
      <p>Event Happening: ${happening}</p>
      <p>Event Description: ${description}</p>

  <p style="text-align: center;"> SEE YOU THERE </p>
`;


  const mailOptions = {
    from: 'phuonglinh.ngo2608@gmail.com',
    to: Email,
    subject: 'Email Confirmation - WDC_008_Ian Knight Appreciation club',
    html: htmlContent,
    file: 'public/User.html'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent:', info.response);
    return res.send('Email sent successfully');
  });
});

// } catch (err) {
//   console.error('Error:', err);

app.get('/api/user', async (req, res) => {
  try {

    // const id=123;
    const ID = await query('SELECT id FROM Users WHERE email = ? LIMIT 1', [Email]);
    const { id } = ID[0]; // Extract the ID value from the query result

    res.json({ email: Email, id });
    console.log(id);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/user',async(req, res) => {
  // Your code to fetch user data from the database
  // Replace this with your actual database query
  try{
   const f_name=await query('SELECT first_name FROM Users WHERE email = ? LIMIT 1',[Email]);
   const { first_name: firstName } = f_name[0];
   const l_name=await query('SELECT last_name FROM Users WHERE email = ? LIMIT 1',[Email]);
   const { last_name: lastName } = l_name[0];
   const Username = await query('SELECT username FROM Users WHERE email = ? LIMIT 1', [Email]);
   const { username: userName } = Username[0];
   const ID = await query('SELECT id FROM Users WHERE email = ? LIMIT 1', [Email]);
   const { id: Id } = ID[0];

   const phone_number = await query('SELECT phone_number FROM Users WHERE email = ? LIMIT 1', [Email]);
   const { phone_number: phoneNumber } = phone_number[0];
   const Password = await query('SELECT password FROM Users WHERE email = ? LIMIT 1', [Email]);
   const { password: passWord } = Password[0];


   res.json({
 firstName, lastName, userName,Id, phoneNumber, email: Email, passWord
});
   console.log(firstName);
   console.log(lastName);
   console.log(userName);
   console.log(Id);
   console.log(phoneNumber);
   console.log(Email);
   console.log(Password);



}catch(error){
    console.error(error);
    res.sendStatus(500);

  }
});


app.put('/user', async (req, res) => {
  try {
    const { newFirstName, newLastName, newUsername, newID, newPhoneNumber, newEmail,
      newPassword } = req.body;

    // Your code to update the user information in the database
    // Replace this with your actual database update query
    await query('UPDATE Users SET first_name=?, last_name=?, username=?, phone_number=?, email=?, password=? WHERE email=?', [newFirstName, newLastName, newUsername, newPhoneNumber, newEmail, newPassword, Email]);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.get('/join', async(req, res) => {
  // join new club
  // query to fill user's info into space
  try{
    const f_name=await query('SELECT first_name FROM Users WHERE email = ? LIMIT 1',[Email]);
    const { first_name: firstName } = f_name[0];
    const l_name=await query('SELECT last_name FROM Users WHERE email = ? LIMIT 1',[Email]);
    const { last_name: lastName } = l_name[0];
   const Username = await query('SELECT username FROM Users WHERE email = ? LIMIT 1', [Email]);
   const { username: userName } = Username[0];

   const Password = await query('SELECT password FROM Users WHERE email = ? LIMIT 1', [Email]);
   const { password: currentPassword } = Password[0];


   res.json({
 firstName, lastName, userName, currentPassword
});
   console.log(firstName);
   console.log(lastName);
   console.log(userName);

   console.log(Email);
   console.log(currentPassword);



}catch(error){
    console.error(error);
    res.sendStatus(500);

  }
});

app.get('/clubs', (req, res) => {
  // get clubs which user have not join yet and show it in the options
  dbConnectionPool.query('SELECT name FROM Clubs WHERE id NOT IN (SELECT club_id FROM ClubMembers WHERE user_id IN (SELECT id FROM Users WHERE email = ?))', [Email], (error, results) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});


app.post('/joinclub', async (req, res) => {
  try {
    const { selectedOption } = req.body;
    const values = [Email, selectedOption];


    await query('INSERT INTO ClubMembers (user_id, club_id) SELECT Users.id, Clubs.id FROM Users, Clubs WHERE Users.email = ? AND Clubs.name = ?',values);


    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});



app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);


// END OF LYNN's PART




app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);


// END OF LYNN's PART

// Serve static public pages before using any routers
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// Verify can use user resources here

// Serve static user pages before using any routers
app.use('/users', express.static(path.join(__dirname, 'users')));
app.use('/users', usersRouter);

// Verify can use club manager resources here

// Serve static club manager pages before using any routers
app.use('/club_manager', express.static(path.join(__dirname, 'club_manager')));
app.use('/club_manager', clubManagerRouter);

// Verify can access admin resources here

// Serve static admin pages before using the admin router
app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.use('/admin', adminRouter);

module.exports = app;
