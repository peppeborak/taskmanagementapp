import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kalle123',
  database: 'task_management_db',
})

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error)
  } else {
    console.log('Connected to MySQL database!')
  }
})

export const createUserDb = (email, password) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO users (email, passwordHash) VALUES (?, ?)`,
      [email, password],
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      }
    )
  })
}

export const getUserDb = async (email) => {
  return new Promise((resolve, reject) => {
    const [rows] = connection.query(
      'SELECT id, email, password FROM users WHERE email = ?',
      [email]
    )
    if (err) return reject(err)
    resolve(rows[0])
  })
}
