const { error } = require('console');
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => res.end("Conociendo NodeJS"))
app.use('/Public', express.static(path.join(__dirname, 'Public')))
app.use(express.json());

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hackathon"
})

conexion.connect(error => error ? console.log(error) : console.log("Conexion Exitosa"))
app.listen(port, () => console.log(`Servidor corriendo en el puerto: ${port}`))

app.post("/api/formulario", (req, res) => {
    const data = {
        nombres: req.body.nombresform,
        correo: req.body.correoform,
        asunto: req.body.asuntoform,
        mensaje: req.body.mensajeform,
    };
    const sql = "INSERT INTO prueba SET ?";
    conexion.query(sql, data, (error, results) => {
        if(error){
            console.error(error);
            res.status(500).send("Error en el servidor");
        } else{
            console.log(data);
            res.send(data);
        }
    });
});

app.get("/api/formulario", (req, res) => {
    const sql = "SELECT * FROM prueba";
    conexion.query(sql, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send("Error en el servidor");
        } else {
            console.log(results);
            res.send(results);
        }
    });
});