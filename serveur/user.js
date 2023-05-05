const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const cors = require("cors");



// Create a MySQL connection pool
const pool = mysql.createPool({
    // connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user'
});

// Create a new Express application
const app = express();

var corsOptions = {
    // origin: "http://localhost:4200",
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

// Define a login endpoint
app.post('/api/register', (req, res) => {
    const { nom, prenom, ddn, numCartCIN, role, departement, login, mot_de_passe } = req.body;
    console.log(mot_de_passe);
    const hashedPassword = bcrypt.hashSync(mot_de_passe, 10);
    console.log(hashedPassword);
    const sql = 'INSERT INTO utilisateur_nv (nom, prenom,ddn,numCartCIN,role,departement,login,mot_de_passe) VALUES (?,?,?,?,?,?,?,?)';
    pool.query(sql, [nom, prenom, ddn, numCartCIN, role, departement, login, hashedPassword], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error registering user');
        } else {
            const token = jwt.sign({ login }, 'secret-key');
            res.status(200).send({ token });
        }
    });
});

app.get('/api/etudiant', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, 'secret-key', (err, decoded) => {
            if (err) {
                res.status(401).send('Invalid token');
            } else {
                pool.query("SELECT * FROM etudiant", function (err, result, fields) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).send(result)
                    }
                });
            }

        });
    }
});

app.post('/api/login', async (req, res) => {
    const { login, password } = req.body;
    //const passwordNonCrypte
    const sql = 'SELECT * FROM etudiant WHERE login = ?';
    await pool.query(sql, [login], (err, result) => {
        console.log(result);
        if (err) {
            res.status(500).send('Error logging in');
        }
        else if (result.length == 0) {
            res.status(401).send('Invalid login or password');
            //console.log(res.status(401).send('Invalid login or password'))
        } else {
            const user = result[0];
            console.log(bcrypt.compareSync(password, user.password))
            if (bcrypt.compareSync(password, user.password)) {
                const conn = true
                const token = jwt.sign({ login }, 'secret-key');
                res.status(200).send({ token, conn });
                // res.status(200).send({ "conn": true });

            } else {
                res.status(401).send('Invalid  password');
            }
        }
    })
});

// Start the server
app.listen(3100, () => {
    console.log('Server started on port 3100');
});