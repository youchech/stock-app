const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // replace with your MySQL username
  password: '',       // replace with your MySQL password
  database: 'stock_app'
})

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
  } else {
    console.log('Connected to MySQL database')
  }
})

module.exports = connection