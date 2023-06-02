<h1 class="nombrePagina">Servicios</h1>
<p class="descripcionPag">Administración de servicios</p>

<?php
include_once __DIR__ . '/../templates/barra.php';
?>

<ul class="servicios">
    <?php
        foreach ($servicios as $servicio) {
            
    ?>

            <li>
                <p>Nombre: <span> <?php echo $servicio->nombre; ?> </span></p>
                <p>Precio: <span> <?php echo $servicio->precio . '€'; ?> </span></p>
            </li>

            <div class="acciones-servicios">
                <a href="/servicios/actualizar?id=<?php echo $servicio->id; ?>"
                    class="boton-actualizar">Actualizar</a>
            </div>

    <?php
        }
            
    ?>
    <div class="paginacion">
        <a type="submit" href="/admin" class="boton">Volver Atrás</a>
    </div>
</ul>