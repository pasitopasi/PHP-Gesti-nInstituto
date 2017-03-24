<?php
    $conexion = new mysqli("localhost","root","root");
    if($conexion){ 
        $conexion->select_db ("bd_cliente_proyecto");
    }