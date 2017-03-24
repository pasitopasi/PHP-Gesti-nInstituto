<?php

    include_once "Conectar.php";

    $obetoJasonJS = $_REQUEST['objetoJson'];
    $obj_php1 = json_decode($obetoJasonJS);

    $user = $obj_php1->user;
    $pass = $obj_php1->pass;

    $obj_php = new stdClass();
    $EquipoDir = "";
    $Nombre = "";
    $ID = "";
    $Tutor = "";
    $ordenSQL = "select * from profesor where Usuario='" . $user . "' and Contraseña = '" . $pass . "'";
    global $conexion;
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $fila = $resultado->fetch_array();
        while ($fila) {
            $EquipoDir = $fila["EquipoDir"];
            $Nombre = $fila["Nombre"];
            $ID = $fila["ID"];
            $Tutor = $fila["Tutor"];
            $fila = $resultado->fetch_array();
        }
    }
    $obj_php->ID = $ID;
    $obj_php->Nombre = $Nombre;
    $obj_php->EquipoDir = $EquipoDir;
    $obj_php->Tutor = $Tutor;

    echo json_encode($obj_php);
