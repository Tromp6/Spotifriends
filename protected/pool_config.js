const Pool = require('pg').Pool;
module.exports = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'spotifriendsdb',
  password: 'umckaloabomaximiliandestroyer',
  port: 5432,
})