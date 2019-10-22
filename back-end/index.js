const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()

const SELECT_ALL_PROJECT_QUERY = 'SELECT * FROM project_monitoring'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projectMonitoring'
})

connection.connect(err => {
    if(err) {
        return err;
    }
})

app.use(cors())

app.get('/', (req, res) =>{
    res.send('gunakan /project untuk ke table project')
})

app.get('/project', (req, res) => {
    connection.query(SELECT_ALL_PROJECT_QUERY, (err, result) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: result
            })
        }
    })
})

app.get('/project/add', (req, res) => {
    const{ nama_project, Task, PIC, deadline, status_progress, priority } = req.query
    const INSERT_PROJECT_QUERY = `INSERT INTO project_monitoring(nama_project, Task, PIC, deadline, status_progress, priority) VALUES(
        '${nama_project}', '${Task}', '${PIC}', '${deadline}', '${status_progress}', '${priority}', 
    )`
    connection.query(INSERT_PROJECT_QUERY, (err, result) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('Project Behasil Ditambahkan')
        }
    })
})


app.listen(4000, () => {
    console.log('server berjalan di port 4000')
})