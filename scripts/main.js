/* Meetings app */

/* Funciones que debería tener:
* [Listo] Agregar participante
* [Listo] Prender/Apagar cámara
* [Listo] Prender/Apagar micrófono
* [Listo] Subir/Bajar volumen
* [Listo] Agregar participantes
* [Listo] Listar participantes
*       |-> [] Ordenar la lista.
* [Listo] 00: Eliminar participante
*       |-> [Listo] Mostrar index de participante para poder eliminarlo
* [] Compartir imágenes
* [Listo] Mostrar la hora
* 
*/

let cal = new Date();
let participantes = [];

const camara = {
    status: false,
    camOn: document.getElementById('camOn'),
    camOff: document.getElementById('camOff'),
    cam: document.getElementById('cam'),
}
camara.cam.addEventListener("click", toggle_camara);

let microfono = {
    status: false,
    micOn: document.getElementById('micOn'),
    micOff: document.getElementById('micOff'),
    mic: document.getElementById('mic')
}
microfono.mic.addEventListener("click", toggle_microfono);

let volumen = 50;
const opcionesPosibles = ["0", "00", "1", "2", "3", "+", "-", "salir"];

const hora = document.getElementById("hora");

function actualizarHora() {
    hora.textContent = `${cal.getHours()}:${cal.getMinutes()}`;
}

// Participantes
function agregar_participante() {
    let nombre = prompt("Hola, ¿Cuál es tu nombre?");
    participantes.push(nombre);
    console.log(`Bienvenido/a a la reunión ${nombre}.`);
}

function listar_participantes() {
    let part = document.getElementById('participantes');
    participantes.sort();

    while (part.firstChild) {
        part.removeChild(part.firstChild);
    }

    for (let i of participantes) {
        let name = document.createElement('li');
        name.textContent = i;
        part.appendChild(name);
        console.log(i);
    }
    console.log("En la reunión están:");
    for (let i of participantes) {
        console.log(i);
    }
}

function eliminar_participantes() {
    for (let i of participantes) {
        console.log(`${participantes.indexOf(i)}: ${i}`);
    }
    let eliminar_a = prompt(`¿A quién deseas eliminar? (Introduce su número de participante)`);
    alert(`Adiós ${participantes[eliminar_a]}.`);
    participantes.splice(eliminar_a, 1);
    if (participantes.length === 0) {
        go_on = false;
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
agregar_participante();
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