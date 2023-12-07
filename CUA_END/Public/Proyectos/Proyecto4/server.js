var express = require("express")
var mysql = require("mysql")
var app = express()
const port = 3001;
const path = require('path');
const http = require('http');

app.get ('/', (req, res) => {
    res.send("conociendo NodeJs");
})

//conexion de archivos estaticos
app.use('/Form', express.static(path.join(__dirname, 'Form')))

//llamamos a la app para que use el express.json
app.use(express.json())

//crear conexion a base de datos
var conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "practica_node"
})

conexion.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log("Conexión exitosa");
    }
});

const puerto = process.env.PUERTO || 3001;

app.listen(puerto, function () {
    console.log("Servidor funcionando en puerto: " + puerto);
});


app.post(
    "/api/formulario", (req, res) => {
        let data = {
            nombres: req.body.nombresform,
            apellidos: req.body.apellidosform,
            eleccion_carrera: req.body.eleccion_carreraform,
            numero_dni: req.body.numero_dniform,
            correo_institucional: req.body.correo_institucionalform,
            contrasena: req.body.contrasenaform,
            fecha_nacimiento: req.body.fecha_nacimientofrom,
        };
        let sql = "INSERT INTO formulario SET ?";
        conexion.query(
            sql, data, function (error, results) {
                if (error) {
                    throw error;
                } else {
                    console.log(data);
                    res.send(data);
                }
            }
        );
    }
);

app.get("/api/formulario", (req, res) => {
    let sql = "SELECT * FROM formulario";
    conexion.query(
        sql, (error, results) => {
            if (error) {
                throw error;
            } else {
                console.log(results);
                res.send(results);
            }
        }
    );
}
);