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


let volumen = 50;
// const opcionesPosibles = ["0", "00", "1", "2", "3", "+", "-", "salir"];

const hora = document.getElementById("hora");

// Event listeners
addPart.addEventListener("click", agregar_participante);
delPart.addEventListener("click", eliminar_participante);
camara.cam.addEventListener("click", toggle_camara);
microfono.mic.addEventListener("click", toggle_microfono);

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
    let nombre = prompt("Hola, ¿Cuál es tu nombre?");
    let novato = new Persona(nombre, randomID());
    participantes.push(novato);
    console.log(`Bienvenido/a a la reunión ${novato.nombre}. con ID: ${novato.id}`);
    sessionStorage.setItem('participantes', JSON.stringify(participantes));
}

function listar_participantes() {

    participantes = JSON.parse(sessionStorage.getItem('participantes'));
    if (participantes.length === 0) {
        return;
    }
    // participantes.sort();


    while (part.firstChild) {
        part.removeChild(part.firstChild);
    }

    for (let i of participantes) {
        let name = document.createElement('li');
        name.textContent = `${i.nombre} (${i.id})`;
        part.appendChild(name);
        // console.log(i);
    }
    /*     console.log("En la reunión están:");
        for (let i of participantes) {
            console.log(i);
        } */
}

// TO-DO
function eliminar_participante() {
    let eliminar = prompt("Ingresa el ID de quien quieres eliminar")
    for (let i = 0; participantes.length > i; i += 1) {
        console.log(i);
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

// Ejecución
// agregar_participante();

let salir = false;
/* while (!salir) {
    let opcion1;
    let opcion2;
    if (camara.status === true) {
        opcion1 = "Apagar cámara";
    } else {
        opcion1 = "Prender cámara";
    }

    if (microfono === true) {
        opcion2 = "Apagar micrófono";
    } else {
        opcion2 = "Prender micrófono";
    }

    actualizarHora();

    let decision = prompt(`¿Qué deseas hacer? 
Opciones:
0: Agregar participante
00: Eliminar participante
1: ${opcion1}
2: ${opcion2}
3: Listar participantes
+: Subir volumen
-: Bajar volumen
Salir: Irse de la reunión`).toLowerCase();

    switch (decision.toLowerCase()) {
        case "0":
            agregar_participante();
            listar_participantes();
            break

        case "00":
            eliminar_participantes();
            break;

        case "1":
            toggle_camara();
            break;

        case "2":
            toggle_microfono();
            break;

        case "3":
            listar_participantes();
            break;

        case "+":
            subir_volumen();
            break;

        case "-":
            bajar_volumen();
            break;

        case "salir":
            salir = true;
            break;

        default:
            if (!opcionesPosibles.includes(decision)) {
                alert(`¡Ups!, no entraste una opción válida.`);
                continue;
            }
            break;
    }
} */