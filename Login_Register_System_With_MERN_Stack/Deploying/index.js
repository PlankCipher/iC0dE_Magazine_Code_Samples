const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MySQLSessionStore = require('express-mysql-session')(session);
const requireNotLoggedin = require('./middlewares/requireNotLoggedin.js');
const requireLoggedin = require('./middlewares/requireLoggedin.js');

const User = require('./db/User.js');
const dbConfig = require('./db/connectionConfig.js');

const user = new User();
const app = express();
const sessionStore = new MySQLSessionStore(dbConfig);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      /^http:\/\/localhost/,
      /^http:\/\/login-register-demo.herokuapp.com/,
    ],
    credentials: true,
  }),
);
app.use(
  session({
    secret: process.env.SESSION_KEY,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
  }),
);

app.post('/api/users/register', requireNotLoggedin, async (req, res) => {
  const { username, password, email } = req.body;
  const result = await user.register(username, password, email);
  res.status(result).end();
});

app.post('/api/users/login', requireNotLoggedin, async (req, res) => {
  const { username, password } = req.body;
  const {
    statusCode,
    user: { id, email },
  } = await user.login(username, password);

  const loggedInUser = { id, username, email };

  if (statusCode === 204) {
    req.session.user = loggedInUser;
  }

  res.json({ user: loggedInUser, statusCode });
});

app.post('/api/users/logout', requireLoggedin, (req, res) => {
  req.session.destroy(() => {
    res.status(200).end();
  });
});

app.get('/api/users/currentUser', (req, res) => {
  req.session.user
    ? res.json({ user: req.session.user })
    : res.json({ loggedIn: false });
});

if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 5000);
