var mysql = require('mysql');

var connMySQL = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'dev',
        password: 'dev',
        database: 'engenhariadesoftware'
    });
}

module.exports = () => {
    return connMySQL;
}
