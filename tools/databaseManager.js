const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

class DatabaseManager {
    constructor(databaseName) {
        const databasePath = path.join(__dirname, '..', 'databases', databaseName);
        this.database = new Database(databasePath);
        this.sqlDirectory = path.join(__dirname, '..', 'sql');
    }

    createStocksTable() {
        const sqlFile = path.join(this.sqlDirectory, 'createStocksTable.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');
        this.database.exec(sql);
    }

    deleteStocksTable() {
        const sqlFile = path.join(this.sqlDirectory, 'deleteStocksTable.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');
        this.database.exec(sql);
    }

    insertStockData(dataArray) {
        const sqlFile = path.join(this.sqlDirectory, 'insertStockData.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');
        const insert = this.database.prepare(sql);
        insert.run(dataArray);
    }
}

module.exports = DatabaseManager;
