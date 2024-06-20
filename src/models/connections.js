const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
require('dotenv').config();

async function openDb() {
    return open({
        filename: process.env.SQLITE_DB_FILE || './todolist.sqlite',
        driver: sqlite3.Database
    });
}

module.exports = openDb;
