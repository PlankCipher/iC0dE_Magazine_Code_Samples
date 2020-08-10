const execQuery = require('./execQuery.js');
const bcrypt = require('bcrypt');

class User {
  async register(username, password, email) {
    let statusCode = 409;

    try {
      const matchingUsersSql =
        'SELECT * FROM users WHERE name = CONVERT(? USING utf8) COLLATE utf8_bin';
      const [matchingUsers] = await execQuery(matchingUsersSql, [username]);

      if (matchingUsers.length === 0) {
        const passwordHash = await bcrypt.hash(password, 10);

        const userInsertionSql =
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        await execQuery(userInsertionSql, [username, email, passwordHash]);

        statusCode = 201;
      }
    } catch (err) {
      console.log(err);
      statusCode = 500;
    }

    return statusCode;
  }

  async login(username, password) {
    let statusCode = 422;
    let user = {};

    try {
      const getUserSQL =
        'SELECT * FROM users WHERE name = CONVERT(? USING utf8) COLLATE utf8_bin';
      const [users] = await execQuery(getUserSQL, [username]);

      if (users.length > 0) {
        const passwordMatch = await bcrypt.compare(password, users[0].password);
        if (passwordMatch) {
          statusCode = 204;
          user = users[0];
        }
      }
    } catch (err) {
      console.log(err);
      statusCode = 500;
    }

    return { statusCode, user };
  }
}

module.exports = User;
