<?php
    include_once "Conectar.php";
    
    $ordenSQL="select * from motivo";
    global $conexion;
    $resultado=$conexion->query($ordenSQL);
    if ($resultado){
        $fila=$resultado->fetch_array();
        $obj_php = new stdClass();
        $arrayID = array();
        $arrayNombre = array();
        while($fila){
            $arrayDatos[]=$fila["ID"];
            $arrayNombre[]=$fila["Descripcion"];
            $fila=$resultado->fetch_array();
        }
        
        $obj_php->ID =  $arrayDatos;
        $obj_php->Nombre = $arrayNombre;
    
        echo json_encode($obj_php);
    }