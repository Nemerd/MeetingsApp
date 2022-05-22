/* Meetings app */

// Funciones que debería tener:
// [Rehecho][Listo] Agregar participante
// [Rehecho][Listo] Prender/Apagar cámara
// [Rehecho][Listo] Prender/Apagar micrófono
// [][Listo] Subir/Bajar volumen
// [Rehecho][Listo] Agregar participantes
// [Rehecho][Listo] Listar participantes
//       |-> [Listo] Ordenar la lista.
//       |-> [] Busqueda de participantes
/* ahi podrias agregar una opcion que diga buscar participante, 
luego un prompt que pregunte alguna palabra para buscar, luego 
podrias realizar un filtro de tu arreglo y listar a los 
participantes que cumplen con esa condicion */
// [][Listo] 00: Eliminar participante
//       |-> [Listo] Mostrar index de participante para poder eliminarlo
// [] Compartir imágenes
// [Listo] Mostrar la hora
// [] Mostrar imagen de participante cuando la cámara esté encendida



let cal = new Date();

const myModal = new bootstrap.Modal(document.getElementById('modalAgregaParticipantes'));
let participantes = [];
const part = document.getElementById("participantes");
window.setInterval(listar_participantes, 1000);

const camara = {
    status: false,
    camOn: document.getElementById('camOn'),
    camOff: document.getElementById('camOff'),
    cam: document.getElementById('cam'),
}
const microfono = {
    status: false,
    micOn: document.getElementById('micOn'),
    micOff: document.getElementById('micOff'),
    mic: document.getElementById('mic')
}

class Persona {
    constructor(nombre, id) {
        this.nombre = nombre;
        this.id = id;
    }
}

const addPart = document.getElementById("addPart");
const delPart = document.getElementById("delPart");
const nuevoParticipante = document.getElementById("nuevoParticipante");
const agregarNombre = document.getElementById("agregarNombre");


let volumen = 50;

const hora = document.getElementById("hora");

// Event listeners
addPart.addEventListener("click", () => myModal.show());
delPart.addEventListener("click", eliminar_participante);
camara.cam.addEventListener("click", toggle_camara);
microfono.mic.addEventListener("click", toggle_microfono);
agregarNombre.addEventListener("click", agregar_participante);
nuevoParticipante.addEventListener("input", (e) => {
    console.log(e)
    if (e.inputType === "insertLineBreak") {
        agregar_participante();
    }
});


function actualizarHora() {
    hora.textContent = `${cal.getHours()}:${cal.getMinutes()}`;
}

function randomID() {
    let random = Math.floor(Math.random() * 101);

    if (participantes.length === 0) {
        return random;
    }

    for (let i of participantes) {
        if (random === i.id) {
            console.log(i.id);
            // return randomID();
        } else {
            return random;
        }
    }
}

// Participantes
function agregar_participante() {
    const nombre = nuevoParticipante.value;
    let novato = new Persona(nombre, randomID());
    participantes.push(novato);
    console.log(`Bienvenido/a a la reunión ${novato.nombre} con ID: ${novato.id}`);
    sessionStorage.setItem('participantes', JSON.stringify(participantes));
    myModal.hide();
    nuevoParticipante.value = "";
}

function listar_participantes() {

    !sessionStorage.getItem('participantes') ?
        sessionStorage.setItem('participantes', JSON.stringify(participantes)) :
        participantes = JSON.parse(sessionStorage.getItem('participantes'));

    while (part.firstChild) {
        part.removeChild(part.firstChild);
    }


    for (let i of participantes) {
        let name = document.createElement('li');
        name.textContent = `${i.nombre} (${i.id})`;
        part.appendChild(name);
    }
}

function eliminar_participante() {
    let eliminar = prompt("Ingresa el ID de quien quieres eliminar")
    for (let i = 0; participantes.length > i; i += 1) {
        if (participantes[i].id == eliminar) {
            console.log(`Adios ${participantes[i].nombre}`);
            participantes.splice(i, 1);
            sessionStorage.setItem('participantes', JSON.stringify(participantes));
        }
    }
}

// Cámara
function toggle_camara() {
    camara.status = !camara.status;
    console.log(`Cámara prendida: ${camara.status}`);
    camara.camOn.classList.toggle('visible', camara.status);
    camara.camOff.classList.toggle('visible', !camara.status);
}

// Micrófono
function toggle_microfono() {
    microfono.status = !microfono.status;
    console.log(`Micrófono prendido: ${microfono.status}`);
    micOn.classList.toggle('visible', microfono.status);
    micOff.classList.toggle('visible', !microfono.status);
}

// Volumen
function subir_volumen() {
    volumen = volumen + 10;
    if (volumen >= 100) {
        console.log("Volumen máximo");
        volumen = 100;
    }
    console.log(`El volumen está al ${volumen}`);
    alert(`El volumen está al ${volumen}`);
}

function bajar_volumen() {
    volumen = volumen - 10;
    if (volumen <= 0) {
        console.log("Volumen apagado");
        volumen = 0;
    }
    console.log(`El volumen está al ${volumen}`);
    alert(`El volumen está al ${volumen}`);
}