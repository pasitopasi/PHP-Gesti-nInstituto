<?php

    include_once "Conectar.php";

    $obj_php = new stdClass();
    $arraNombre = array();
    $arraID = array();

    $ordenSQL = "select * from profesor";
    global $conexion;
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $fila = $resultado->fetch_array();
        while ($fila) {
            $arraNombre[] = $fila["Nombre"]." ".$fila["Apellidos"];
            $arraID[] = $fila["ID"];
            $fila = $resultado->fetch_array();
        }
    }
    $obj_php->Nombre = $arraNombre;
    $obj_php->ID = $arraID;

    echo json_encode($obj_php);
