<?php


namespace Controllers;

use Model\AdminCita;
use MVC\Router;

class AdminController
{
    public static function index(Router $router)
    {
        session_start();

        // Consultar la base de datos

        $consulta = "SELECT sesiones.id, sesiones.hora, CONCAT( usuarios.nombre, ' ', usuarios.apellidos) as cliente, ";
        $consulta .= " usuarios.email, usuarios.telefono, servicios.nombre as servicio, servicios.precio  ";
        $consulta .= " FROM sesiones  ";
        $consulta .= " LEFT OUTER JOIN usuarios ";
        $consulta .= " ON sesiones.usuarioId=usuarios.id  ";
        $consulta .= " LEFT OUTER JOIN sesionesServicios ";
        $consulta .= " ON sesionesServicios.sesionId=sesiones.id ";
        $consulta .= " LEFT OUTER JOIN servicios ";
        $consulta .= " ON servicios.id=sesionesServicios.servicioId ";
        // $consulta .= " WHERE fecha =  '${fecha}' ";

        $sesiones = AdminCita::SQL($consulta);


        $router->render('admin/index', [
            'nombre' => $_SESSION['nombre'],
            'sesiones' => $sesiones
        ]);
    }
}
