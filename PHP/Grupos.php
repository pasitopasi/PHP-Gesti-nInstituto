<?php
    include_once "Conectar.php";

    $ordenSQL="select * from grupo";
    global $conexion;
    $resultado=$conexion->query($ordenSQL);
    if ($resultado){
        $fila=$resultado->fetch_array();
        $obj_php = new stdClass();
        $arrayID = array();
        $arrayNombre = array();
        while($fila){
            $arrayID[]=$fila["ID"];
            $arrayNombre[]=$fila["Denominación"];
            $fila=$resultado->fetch_array();
        }
        $obj_php->ID = $arrayID;
        $obj_php->Denominacion = $arrayNombre;
        echo json_encode($obj_php);
    }