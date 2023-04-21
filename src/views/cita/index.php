<h1 class="nombrePagina">Crear Nueva Sesión</h1>
<p class="descripcionPag">Elige tus servicios y rellene sus datos</p>

<div class="app">

    <nav class="tabs">
        <button class="actual" type="button" data-paso='1'>Servicios</button>
        <button type="button" data-paso='2'>Información Sesión</button>
        <button type="button" data-paso='3'>Resumen</button>
    </nav>

    <div id="paso1" class="seccion">
        <h2 class="title">Servicios</h2>
        <p class="text-center">Elige tus servicios a continuación:</p>
        <div id="servicios" class="listadoServicios"></div>
    </div>
    <div id="paso2" class="seccion">
        <h2 class="title">Tus datos y Sesión</h2>
        <p class="text-center">Rellene sus datos y fecha de su sesión</p>

        <form class="formulario">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" placeholder="Introduzca su Nombre" value="<?php echo $nombre; ?>" disabled>
            </div>
            <div class="campo">
                <label for="fecha">Fecha</label>
                <input type="date" id="fecha" name="fecha" min="<?php echo date('Y-m-d', strtotime('+1 day')); ?>">
            </div>
            <div class="campo">
                <label for="hora">Hora</label>
                <input type="time" id="hora" name="hora">
            </div>
        </form>
    </div>
    <div id="paso3" class="seccion contenido-resumen">
        <h2 class="title">Resumen</h2>
        <p class="text-center">Verifica que la información sea correcta</p>
    </div>

    <div class="paginacion">
        <button id="anterior" class="boton">&laquo; Anterior</button>
        <button id="siguiente" class="boton">Siguiente &raquo;</button>
    </div>
</div>


<?php
    $script = "<script src='build/js/app.js'></script>"
?>