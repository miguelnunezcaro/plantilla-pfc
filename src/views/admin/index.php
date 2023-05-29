<h1 class="nombrePagina">Panel de Administración</h1>

<?php
include_once __DIR__ . '/../templates/barra.php';
?>
<h2 class="nombrePagina">Buscar Citas</h2>
<div class="busqueda">
    <form class="formulario">
        <div class="campo">
            <label for="fecha">Fecha:</label>
            <input type="date" id="fecha" name="fecha">
        </div>

    </form>
</div>

<div id="citas-admin">
    <ul class="sesiones">
    <?php

        $idCita = 0;

        foreach($sesiones as $sesion) {

            if ($idCita !== $sesion->id) {

                
    ?>

    <li>
        <p>Código de la sesión: <span><?php echo $sesion->id ?></span></p>
        <p>Hora: <span><?php echo $sesion->hora ?></span></p>
        <p>Cliente: <span><?php echo $sesion->cliente ?></span></p>
        <p>Email: <span><?php echo $sesion->email ?></span></p>
        <p>Teléfono: <span><?php echo $sesion->telefono ?></span></p>

        <h3 class="nombrePagina">Servicios</h3>
        <?php $idCita = $sesion->id; } ?>
        <p class="servicio"><?php echo $sesion->servicio . " " . $sesion->precio . "€"; ?></p>

    <?php } ?>
    </ul>
</div>