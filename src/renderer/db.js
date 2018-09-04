const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("/home/m/PycharmProjects/highone/data.db");

export default db;