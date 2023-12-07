const url = "http://localhost:3001/api/formulario"  //creamos la url con host y el puerto

const btnCrear = document.getElementById("btnCrear")  // creamos una const btnCrear que hara que se inserten los datos al dale enviar 

const form = document.querySelector("form")

const tbody = document.querySelector("tbody#data")
//agregamos form con los datos que tenemos en las tablas de la bd y getelement traera los datos del html por el ID
const nombresform = document.getElementById("nombres")
const apellidosform = document.getElementById("apellidos")
const eleccion_carreraform = document.getElementById("tipodocumento")
const numero_dniform = document.getElementById("numdocumento")
const correo_institucionalform = document.getElementById("email")
const contrasenaform = document.getElementById("contrasena")
const fecha_nacimientofrom = document.getElementById("fechaNacimiento")

var opcion = ''; // insertar datos 

btnCrear.addEventListener('click', () => {
	console.log("Acción de listar activada");
	opcion = 'crear';
});

form.addEventListener('submit',
	(e) => {
		e.preventDefault();
        if (opcion == 'crear') {
            if (nombresform.value == "" || apellidosform.value == "" || eleccion_carreraform.value == "" || 
                numero_dniform.value == "" || correo_institucionalform.value == "" || contrasenaform.value == "" || 
                fecha_nacimientofrom.value == "") {
                alert("Asegúrese de que todos los campos estén completos");
                return false;
            } else {
                insertData({
                    nombresform: nombresform.value,
                    apellidosform: apellidosform.value,
                    eleccion_carreraform: eleccion_carreraform.value,
                    numero_dniform: numero_dniform.value,
                    correo_institucionalform: correo_institucionalform.value,
                    contrasenaform: contrasenaform.value,
                    fecha_nacimientofrom: fecha_nacimientofrom.value,
                });
                console.log(nombresform.value);
            }
        } else if (opcion == 'editar') {
            console.log("Activado el ");
        }
	}
);

function insertData(data) {
	fetch(url,
		{
			method: 'POST',
			headers: {
				'content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}
	)
		.then(
			response => response.json()
		)
		.then(
			response => location.reload()
		);
}

//
tbody.innerHTML = ""
//creamos la funcion para que recoge el contenido y la app json
function getData() {
	fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
		.then(res => res.json())
		.then(data => {
			buildTable(data)
		})
}
//creamos una funcion y llamamos a getData
function init() {
	getData();
}
//creamos la funcion para que al completar el formulario se muestren quienés lo han completado, tambien se pueden omitir datos para que no se muestren 
function buildTable(data) {
    if (data.length > 0) {
        data.forEach((data) => {
            tbody.innerHTML += `
            <tr>
                <td>${data['nombres']}</td>
                <td>${data['apellidos']}</td>
                <td>${data['eleccion_carrera']}</td>
                <td>${data['numero_dni']}</td>
                <td>${data['correo_institucional']}</td>
                <td>${data['contrasena']}</td>
                <td>${data['fecha_nacimiento']}</td>
            </tr>`;
        })
    }
}

init()