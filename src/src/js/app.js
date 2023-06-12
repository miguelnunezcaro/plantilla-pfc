let paso = 1;
const pasoInicial = 1;
const pasoFinal = 3;

const cita = {
  id: "",
  nombre: "",
  fecha: "",
  hora: "",
  servicios: [],
};

document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});

function iniciarApp() {
  mostrarSeccion(); // Muestra y oculta las secciones
  tabs(); // Cambia la sección cuando se presione los tabs
  botonesPaginador(); // Agrega o quita los botones del paginador
  paginaAnterior();
  paginaSiguiente();
  consultarAPI(); // Consulta a la API en el backend de PHP

  idCliente();
  nombreCliente(); // Añade el nombre del cliente al objeto de cita
  seleccionarFecha(); // Añade la fecha de la cita al objeto
  seleccionarHora(); // Añade la hora de la cita al objeto
  mostrarResumen();
}

function mostrarSeccion() {
  // Ocultar la sección que tenga la clase de mostrar
  const seccionAnterior = document.querySelector(".mostrar");

  if (seccionAnterior) {
    seccionAnterior.classList.remove("mostrar");
  }

  // Seleccionar la seccion con el paso
  const pasoSelector = `#paso${paso}`;
  const seccion = document.querySelector(pasoSelector);
  seccion.classList.add("mostrar");

  // Quita la clase de actual al tab anterior
  const tabAnterior = document.querySelector(".actual");

  if (tabAnterior) {
    tabAnterior.classList.remove("actual");
  }

  // Resalta el tab actual
  const tab = document.querySelector(`[data-paso="${paso}"]`);
  tab.classList.add("actual");
}

function tabs() {
  const botones = document.querySelectorAll(".tabs button");

  botones.forEach((boton) => {
    boton.addEventListener("click", function (e) {
      paso = parseInt(e.target.dataset.paso);

      mostrarSeccion();
      botonesPaginador();
    });
  });
}

function botonesPaginador() {
  const paginaAnterior = document.querySelector("#anterior");
  const paginaSiguiente = document.querySelector("#siguiente");

  if (paso === 1) {
    paginaAnterior.classList.add("ocultar");
    paginaSiguiente.classList.remove("ocultar");
  } else if (paso === 3) {
    paginaAnterior.classList.remove("ocultar");
    paginaSiguiente.classList.add("ocultar");

    mostrarResumen(); // Para llegar a la función mostrarResumen() por los botones de paginación
  } else {
    paginaAnterior.classList.remove("ocultar");
    paginaSiguiente.classList.remove("ocultar");
  }

  mostrarSeccion();
}

function paginaAnterior() {
  const paginaAnterior = document.querySelector("#anterior");
  paginaAnterior.addEventListener("click", () => {
    if (paso <= pasoInicial) return;
    paso--;
    botonesPaginador();
  });
}

function paginaSiguiente() {
  const paginaSiguiente = document.querySelector("#siguiente");
  paginaSiguiente.addEventListener("click", () => {
    if (paso >= pasoFinal) return;
    paso++;
    botonesPaginador();
  });
}

async function consultarAPI() {
  try {
    const url = "http://localhost:3000/api/servicios";
    const resultado = await fetch(url);
    const servicios = await resultado.json();
    mostrarServicios(servicios);
  } catch (error) {
    console.log(error);
  }
}

function mostrarServicios(servicios) {
  // console.log(servicios);

  servicios.forEach((servicio) => {
    const { id, nombre, precio } = servicio;

    const nombreServicio = document.createElement("P");
    nombreServicio.classList.add("nombre-servicio");
    nombreServicio.textContent = nombre;

    const precioServicio = document.createElement("P");
    precioServicio.classList.add("precio-servicio");
    precioServicio.textContent = `${precio}€`;

    const servicioDiv = document.createElement("DIV");
    servicioDiv.classList.add("servicio");
    servicioDiv.dataset.idServicio = id;
    servicioDiv.onclick = () => {
      seleccionarServicio(servicio);
    };

    servicioDiv.appendChild(nombreServicio);
    servicioDiv.appendChild(precioServicio);

    document.querySelector("#servicios").appendChild(servicioDiv);
  });
}

function seleccionarServicio(servicio) {
  const { id } = servicio;
  const { servicios } = cita;
  const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);

  if (servicios.some((agregado) => agregado.id === id)) {
    // Eliminar servicio si ya está seleccionado
    cita.servicios = servicios.filter((agregado) => agregado.id !== id);
    divServicio.classList.remove("seleccionado");
  } else {
    if (servicios.length < 3) {
      // Agregar servicio si no se excede el límite de tres
      divServicio.classList.add("seleccionado");
      cita.servicios = [...servicios, servicio];
    } else {
      console.log('hola');
      // Mostrar mensaje de error si se excede el límite
      mostrarAlerta("Solo puedes seleccionar un máximo de tres servicios.", "error", ".listadoServicios");
    }
  }

  // console.log(cita);
}

function idCliente() {
  cita.id = document.querySelector("#id").value;
}

function nombreCliente() {
  cita.nombre = document.querySelector("#nombre").value;
}

function seleccionarFecha() {
  const inputFecha = document.querySelector("#fecha");
  inputFecha.addEventListener("input", (e) => {
    const dia = new Date(e.target.value).getUTCDay();

    if ([6, 0].includes(dia)) {
      e.target.value = "";
      mostrarAlerta("Sábados y domingos no permitidos", "error", ".formulario");
    } else {
      cita.fecha = e.target.value;
    }
  });
}

function seleccionarHora(params) {
  const inputHora = document.querySelector("#hora");
  inputHora.addEventListener("input", (e) => {
    // console.log(e.target.value);

    const horaCita = e.target.value;
    const hora = horaCita.split(":")[0];
    const minutos = horaCita.split(":")[1];

    if (hora < 8 || hora > 21 || minutos !== "00") {
      e.target.value = "";
      mostrarAlerta(
        "Las citas solo se pueden programar en punto y el horario es de 8:00AM a 21:00PM",
        "error",
        ".formulario"
      );
    } else {
      cita.hora = e.target.value;
      // console.log(cita);
    }

    // console.log(hora);
  });
}

function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
  // Previene que se genere mas de una alerta
  const alertaPrevia = document.querySelector(".alerta");

  if (alertaPrevia) {
    alertaPrevia.remove();
  }
  const alerta = document.createElement("DIV");
  alerta.textContent = mensaje;
  alerta.classList.add("alerta");
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
  const resumen = document.querySelector(".contenido-resumen");

  // Limpiar el contenido de resumen

  resumen.innerHTML = "";

  while (resumen.firstChild) {
    resumen.removeChild(resumen.firstChild);
  }
  // console.log(Object.values(cita));

  if (Object.values(cita).includes("") || cita.servicios.length === 0) {
    mostrarAlerta(
      "Faltan datos de servicios, fecha u hora",
      "error",
      ".contenido-resumen",
      false
    );
    return;
  }

  // Formatera el div de resumen
  const { nombre, fecha, hora, servicios } = cita;

  // Heading para servicios en resumen
  const headingServicios = document.createElement("H3");
  headingServicios.textContent = "Resumen de Servicios";
  headingServicios.classList.add("descripcionPag");
  resumen.appendChild(headingServicios);

  // Iterando y mostrando los servicios

  servicios.forEach((servicio) => {
    const { id, precio, nombre } = servicio;
    const contenedorServicio = document.createElement("DIV");
    contenedorServicio.classList.add("contenedor-servicio");

    const textoServicio = document.createElement("P");
    textoServicio.textContent = nombre;
    const precioServicio = document.createElement("P");
    precioServicio.innerHTML = `<span>Precio: </span> ${precio}€`;

    contenedorServicio.appendChild(textoServicio);
    contenedorServicio.appendChild(precioServicio);

    resumen.appendChild(contenedorServicio);
  });

  // Calcular el precio total de los servicios
  const preciosServicios = servicios.map((servicio) => servicio.precio);
  const precioTotal = preciosServicios.reduce(
    (total, precio) => total + parseFloat(precio),
    0
  );

  // Mostrar el precio total
  const precioTotalElement = document.createElement("P");
  precioTotalElement.innerHTML = `<span>Precio Total:</span> ${precioTotal.toFixed(
    2
  )}€`;
  resumen.appendChild(precioTotalElement);

  // Heading para cita en resumen

  const headingCita = document.createElement("H3");
  headingCita.textContent = "Resumen de Cita";
  headingCita.classList.add("descripcionPag");
  resumen.appendChild(headingCita);

  const nombreCliente = document.createElement("P");
  nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`;

  // Formatear la fecha en español

  const fechaObj = new Date(fecha);
  const mes = fechaObj.getMonth();
  const dia = fechaObj.getDate();
  const year = fechaObj.getFullYear();

  const fechaUTC = new Date(Date.UTC(year, mes, dia));
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const fechaFormateada = fechaUTC
    .toLocaleDateString("es-ES", opciones)
    .replace(/\b(?!(?:d|D)e)\w/g, (l) => l.toUpperCase())
    .replace(/De/g, "de");

  const fechaCita = document.createElement("P");
  fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`;
  const horaCita = document.createElement("P");
  horaCita.innerHTML = `<span>Hora:</span> ${hora}`;

  // Boton para crear una cita

  const botonReservar = document.createElement("BUTTON");
  botonReservar.classList.add("boton");
  botonReservar.textContent = "Reservar Cita";
  botonReservar.onclick = reservarCita;

  resumen.appendChild(nombreCliente);
  resumen.appendChild(fechaCita);
  resumen.appendChild(horaCita);
  resumen.appendChild(botonReservar);

  async function reservarCita() {
    const { nombre, fecha, hora, servicios, id } = cita;

    const idServicios = servicios.map((servicio) => servicio.id);
    // console.log(idServicios);

    const datos = new FormData();
    datos.append("fecha", fecha);
    datos.append("hora", hora);
    datos.append("usuarioId", id);
    datos.append("servicios", idServicios);

    // console.log([...datos]);

    try {
      // Petición hacia la API

      const url = "http://localhost:3000/api/citas";

      const respuesta = await fetch(url, {
        method: "POST",
        body: datos,
      });

      const resultado = await respuesta.json();
      console.log(resultado.resultado);

      if (resultado.resultado) {
        Swal.fire({
          icon: "success",
          title: "Cita Creada",
          text: "Tu cita ha sido creada correctamente",
        }).then(() => {
          window.location.reload();
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al guardar la cita",
      });
    }

    // console.log([...datos]);
  }
}
