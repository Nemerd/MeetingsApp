/* Meetings app */

let cal = new Date();

const modalAgregaParticipantes = new bootstrap.Modal(document.getElementById('modalAgregaParticipantes'));
const modalBorraParticipantes = new bootstrap.Modal(document.getElementById('modalBorraParticipantes'));
let participantes = [];
let adminRegistrado = [];
const part = document.getElementById("participantes");
const contenido = document.getElementById("contenido");
const addPart = document.getElementById("addPart");
const delPart = document.getElementById("delPart");
const salirReunion = document.getElementById("salirReunion");
const nuevoParticipante = document.getElementById("nuevoParticipante");
const borrarParticipante = document.getElementById("borrarParticipante");
const formularioAgregar = document.getElementById("formularioAgregar");
const formularioBorrar = document.getElementById("formularioBorrar");
const hora = document.getElementById("hora");

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
    constructor(nombre, id, imagen, isAdmin) {
        this.nombre = nombre;
        this.id = id;
        this.imagen = imagen;
        this.isAdmin = isAdmin;
    }
}

// Event listeners
addPart.addEventListener("click", () => participantes.length >= 10 ? Swal.fire({ icon: 'error', title: 'No se admiten más participantes' }) : modalAgregaParticipantes.show());
delPart.addEventListener("click", () => modalBorraParticipantes.show());
salirReunion.addEventListener("click", () => sessionStorage.setItem('participantes', JSON.stringify([])));
camara.cam.addEventListener("click", toggle_camara);
microfono.mic.addEventListener("click", toggle_microfono);
formularioAgregar.addEventListener("submit", (evt) => {
    evt.preventDefault();
    agregar_participante(evt.target[0].value);
    nuevoParticipante.value = ""
});
formularioBorrar.addEventListener("submit", (evt) => {
    // console.log(evt.target[0].value)
    evt.preventDefault();
    eliminar_participante(evt.target[0].value);
    borrarParticipante.value = ""
});

function actualizarHora() {
    hora.textContent = `${cal.getHours()}:${cal.getMinutes()}`;
}

function tomarAdmins() {
    fetch("../admins/admins.json")
        .then((res) => res.json())
        .then((prom) => {
            prom.forEach((x) => adminRegistrado.push(x));
        })

}

function isIDRepetido(nuevoID) {
    for (let i of participantes) {
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
function agregar_participante(nombre) {
    // console.log(isAdmin(nombre));
    let novato = new Persona(nombre, randomID(), Math.floor(Math.random() * 10, false));
    participantes.push(novato);
    Swal.fire(`Bienvenido/a ${novato.nombre}`);
    sessionStorage.setItem('participantes', JSON.stringify(participantes));
    modalAgregaParticipantes.hide();
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
        (x) => {
            let contenedorVideo = document.createElement("div");
            contenedorVideo.classList.add('contenedorVideo')

            const iconoAusente = `<svg xmlns="http://www.w3.org/2000/svg"
            class="videoDeParticipantes icon icon-tabler icon-tabler-user escondido" width="44" height="44"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="7" r="4" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>`;

            const imagen = document.createElement("img");
            imagen.src = `./placeholders/${x.imagen}.jpg`;
            imagen.alt = `Imagen del participante`;
            imagen.classList.add('imagen');

            contenedorVideo.innerHTML += iconoAusente;
            contenedorVideo.appendChild(imagen);
            contenido.appendChild(contenedorVideo);
        }
    )

};

function eliminar_participante(eliminar) {
    const eliminalo = parseInt(eliminar);
    for (let i = 0; participantes.length > i; i += 1) {
        if (participantes[i].id == eliminalo) {
            console.log(`Adios ${participantes[i].nombre}`);
            Swal.fire(`Adios ${participantes[i].nombre}`)
            participantes.splice(i, 1);
            sessionStorage.setItem('participantes', JSON.stringify(participantes));
        }
    }
    modalBorraParticipantes.hide();
}

function darPrivilegios() {
    console.log("Buscando privilegios")
    participantes.forEach((i) => {
        adminRegistrado.forEach((j) => {
            if (j.nombre === i.nombre){
                i.isAdmin = true;
                console.log(`Privilegio otorgado a ${i.nombre}`);
            }
        })
    })
}

// Cámara
function toggle_camara() {
    camara.status = !camara.status;
    camara.camOn.classList.toggle('visible', camara.status);
    camara.camOff.classList.toggle('visible', !camara.status);
}

// Micrófono
function toggle_microfono() {
    microfono.status = !microfono.status;
    micOn.classList.toggle('visible', microfono.status);
    micOff.classList.toggle('visible', !microfono.status);
}

actualizarHora()
listar_participantes()
mostrar_imagenes_participantes()
tomarAdmins()
darPrivilegios()

window.setInterval(darPrivilegios, 2000)
window.setInterval(mostrar_imagenes_participantes, 2000)
window.setInterval(actualizarHora, 1000)
window.setInterval(listar_participantes, 1000)