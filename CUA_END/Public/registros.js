const url = "http://localhost:3001/api/formulario";
const btnCrear = document.getElementById("btnCrear");
const form = document.querySelector("form");
const tbody = document.querySelector("tbody#data");

const inputs = {
    nombres: document.getElementById("nombres"),
    correo: document.getElementById("correo"),
    asunto: document.getElementById("asunto"),
    mensaje: document.getElementById("mensaje"),
};

var opcion = '';

btnCrear.addEventListener('click', () => {
    console.log("Acción de listar activada");
    opcion = 'crear';
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (opcion == 'crear') {
        if (Object.values(inputs).some(input => input.value === "")) {
            alert("Asegúrese de que todos los campos estén completos");
            return false;
        }
        insertData(Object.fromEntries(Object.entries(inputs).map(([key, input]) => [`${key}form`, input.value])));
        console.log(inputs.nombres.value);
    } else if (opcion == 'editar') {
        console.log("Activado el ");
    }
});

function insertData(data) {
    fetch(url, { method: 'POST', headers: { 'content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(response => response.json())
        .then(() => location.reload());
}

tbody.innerHTML = "";

function getData() {
    fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then(res => res.json())
        .then(data => tbody.innerHTML = data.map(item => `<tr><td>${item.nombres}</td><td>${item.correo}</td><td>${item.asunto}</td><td>${item.mensaje}</td></tr>`).join(""));
}

function init() {
    getData();
}

init();


