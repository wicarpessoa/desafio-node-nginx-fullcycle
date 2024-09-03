const express = require('express')
const app = express()
const PORT = 3000
const config = {
    host: 'db',
    user:'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createTable = `CREATE TABLE IF NOT EXISTS people (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);`
const insert = `INSERT INTO people(name) values('wicar');`
const get = `SELECT * FROM people`
connection.query(createTable)


app.get('/',  (req,res)=> {
  connection.query(insert)
  
  connection.query(get, (error, results) => {
    if (error) throw error;
    let html = '<div style="display: flex; flex-direction: column;"><h1>Full Cycle</h1>'

    for(let i = 0 ; i < results.length; i++) {
      console.log('a')
      html += `<span>${results[i].name}</span>`
    }
    console.log(html)
    html += '</div>'
    res.send (html)
  })
  
})

app.listen(PORT, ()=> {
  console.log(`servidor rodando na porta: ${PORT}`)
})