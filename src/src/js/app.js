let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', () => {
    iniciarApp();
})

function iniciarApp() {
    mostrarSeccion(); // Muestra y oculta las secciones
    tabs(); // Cambia la sección cuando se presione los tabs
    botonesPaginador(); // Agrega o quita los botones del paginador
    paginaAnterior();
    paginaSiguiente();
    consultarAPI(); // Consulta a la API en el backend de PHP
    nombreCliente(); // Añade el nombre del cliente al objeto de cita
    seleccionarFecha(); // Añade la fecha de la cita al objeto
    seleccionarHora(); // Añade la hora de la cita al objeto
    mostrarResumen();
}

function mostrarSeccion() {

    // Ocultar la sección que tenga la clase de mostrar
    const seccionAnterior = document.querySelector('.mostrar');

    if (seccionAnterior) {

        seccionAnterior.classList.remove('mostrar');
    }

    // Seleccionar la seccion con el paso
    const pasoSelector = `#paso${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');

    // Quita la clase de actual al tab anterior
    const tabAnterior = document.querySelector('.actual');

    if (tabAnterior) {
        tabAnterior.classList.remove('actual')
    }

    // Resalta el tab actual
    const tab = document.querySelector(`[data-paso="${paso}"]`);
    tab.classList.add('actual');
}

function tabs() {
    const botones = document.querySelectorAll('.tabs button');

    botones.forEach(boton => {
        boton.addEventListener('click', function (e) {
            paso = parseInt(e.target.dataset.paso);

            mostrarSeccion();
            botonesPaginador();
        })
    })
}

function botonesPaginador() {

    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if (paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    } else if (paso === 3) {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');

        mostrarResumen(); // Para llegar a la función mostrarResumen() por los botones de paginación
    } else {
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }

    mostrarSeccion();
}

function paginaAnterior() {

    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', () => {

        if (paso <= pasoInicial) return;
        paso--;
        botonesPaginador();
    });
}

function paginaSiguiente() {

    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', () => {

        if (paso >= pasoFinal) return;
        paso++;
        botonesPaginador();
    });
}

async function consultarAPI() {

    try {
        const url = 'http://localhost:3000/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios);
    } catch (error) {
        console.log(error);
    }

}

function mostrarServicios(servicios) {

    console.log(servicios);

    servicios.forEach(servicio => {
        const {id,nombre,precio} = servicio;

        const nombreServicio = document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio = document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `${precio}€`;

        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = () => {
            seleccionarServicio(servicio);
        };

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);

        document.querySelector('#servicios').appendChild(servicioDiv);

    });
}

function seleccionarServicio(servicio) {
    const {id} = servicio;
    const {servicios} = cita;

    // Identificar el elemento seleccionado
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

    // Comprobar si un servicio ya fue agregado

    if (servicios.some(agregado => agregado.id === id)) {
        // Eliminar
        cita.servicios = servicios.filter( agregado => agregado.id != id);
        divServicio.classList.remove('seleccionado');
    } else {
        // Agregar
        divServicio.classList.add('seleccionado');
        cita.servicios = [...servicios, servicio];
    }



    console.log(cita);
}

function nombreCliente() {
    cita.nombre = document.querySelector('#nombre').value;
}

function seleccionarFecha() {
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', (e) => {
        
        const dia = new Date(e.target.value).getUTCDay();
        
        if ([6,0].includes(dia)) {
            e.target.value = '';
            mostrarAlerta('Sábados y domingos no permitidos', 'error', '.formulario');
        } else {
            cita.fecha = e.target.value;
        }
    });
}

function seleccionarHora(params) {
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', (e) => {
        console.log(e.target.value);

        const horaCita = e.target.value;
        const hora = horaCita.split(':')[0];
        const minutos = horaCita.split(':')[1];

        if (hora < 8 || hora > 21 || minutos !== '00') {
            e.target.value = '';
            mostrarAlerta('Las citas solo se pueden programar en punto y el horario es de 8:00AM a 21:00PM', 'error', '.formulario');
        } else {
            cita.hora = e.target.value;
            console.log(cita);
        }

        console.log(hora);
    })
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {

    // Previene que se genere mas de una alerta
    const alertaPrevia = document.querySelector('.alerta');

    if(alertaPrevia) {
        alertaPrevia.remove();
    }
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);

    if (desaparece) {
        setTimeout(() => {
            alerta.remove();
        }, 2000);
    }
}

function mostrarResumen() {
    const resumen = document.querySelector('.contenido-resumen');

    console.log(Object.values(cita));

    if (Object.values(cita).includes('') || cita.servicios.length === 0) {
        mostrarAlerta('Faltan datos de servicios, fecha u hora', 'error', '.contenido-resumen', false)
    } else {
        console.log('todo correcto');
    }
}
