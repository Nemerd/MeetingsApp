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

const modalAgregaParticipantes = new bootstrap.Modal(document.getElementById('modalAgregaParticipantes'));
const modalBorraParticipantes = new bootstrap.Modal(document.getElementById('modalBorraParticipantes'));
let participantes = [];
const part = document.getElementById("participantes");

const contenido = document.getElementById("contenido");
// const contenedorVideo = document.getElementById("contenedorVideo");

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
    constructor(nombre, id, imagen) {
        this.nombre = nombre;
        this.id = id;
        this.imagen = imagen;
    }
}


const addPart = document.getElementById("addPart");
const delPart = document.getElementById("delPart");
const nuevoParticipante = document.getElementById("nuevoParticipante");
const borrarParticipante = document.getElementById("borrarParticipante");
const agregarNombre = document.getElementById("agregarNombre");
const borrarNombre = document.getElementById("borrarNombre");


// let volumen = 50;

const hora = document.getElementById("hora");

// Event listeners
addPart.addEventListener("click", () => participantes.length >= 10 ? Swal.fire({ icon: 'error', title: 'No se admiten más participantes' }) : modalAgregaParticipantes.show());
delPart.addEventListener("click", () => modalBorraParticipantes.show());
camara.cam.addEventListener("click", toggle_camara);
microfono.mic.addEventListener("click", toggle_microfono);
agregarNombre.addEventListener("click", agregar_participante);
nuevoParticipante.addEventListener("input", (e) => {
    if (e.inputType === "insertLineBreak" || e.data === null) {
        agregar_participante();
    }
});
borrarNombre.addEventListener("click", eliminar_participante);
borrarParticipante.addEventListener("input", (e) => {
    if (e.inputType === "insertLineBreak" || e.data === null) {
        eliminar_participante();
    }
});


function actualizarHora() {
    hora.textContent = `${cal.getHours()}:${cal.getMinutes()}`;
}

function isIDRepetido(nuevoID) {
    for (let i of participantes) {
        console.log(`Generado: ${nuevoID}`)
        console.log(`Chequeando ${i.id}`)
        if (i.id === nuevoID) {
            return true;
        } else {
            continue;
        }
    }
}

function randomID() {
    let random = 0;
    if (participantes.length === 0) {
        return 0;
    }

    while (isIDRepetido(random)) {
        random = Math.floor(Math.random() * 10);
        console.log(random);
    }
    return random;
}

// Participantes
function agregar_participante() {
    const nombre = nuevoParticipante.value;
    let novato = new Persona(nombre, randomID(), Math.floor(Math.random() * 10));
    participantes.push(novato);
    Swal.fire(`Bienvenido/a ${novato.nombre}`);
    console.log(`Bienvenido/a a la reunión ${novato.nombre} con ID: ${novato.id}`);
    sessionStorage.setItem('participantes', JSON.stringify(participantes));
    modalAgregaParticipantes.hide();
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
        const { nombre, id } = i
        let name = document.createElement('li');
        name.textContent = `${nombre} (${id})`;
        part.appendChild(name);
    }
}

function mostrar_imagenes_participantes() {
    contenido.innerHTML = ""
    participantes.forEach(
        (x) => contenido.innerHTML += `<div id="contenedorVideo" class="contenedorVideo">
        <svg xmlns="http://www.w3.org/2000/svg"
            class="videoDeParticipantes icon icon-tabler icon-tabler-user escondido" width="44" height="44"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="7" r="4" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>
        <img src="./placeholders/${x.imagen}.jpg" alt="Imagen del participante" class="imagen">
        </div>`
    )

};

function eliminar_participante() {
    const eliminar = parseInt(borrarParticipante.value);
    for (let i = 0; participantes.length > i; i += 1) {
        if (participantes[i].id == eliminar) {
            console.log(`Adios ${participantes[i].nombre}`);
            Swal.fire(`Adios ${participantes[i].nombre}`)
            participantes.splice(i, 1);
            sessionStorage.setItem('participantes', JSON.stringify(participantes));
        }
    }
    modalBorraParticipantes.hide();
    borrarParticipante.value = "";
}

// Cámara
function toggle_camara() {
    camara.status = !camara.status;
    // console.log(`Cámara prendida: ${camara.status}`);


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

actualizarHora()
// modalAgregaParticipantes.show()
listar_participantes()
mostrar_imagenes_participantes()
window.setInterval(mostrar_imagenes_participantes, 2000)
window.setInterval(actualizarHora, 1000)
window.setInterval(listar_participantes, 1000)