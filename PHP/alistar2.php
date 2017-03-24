<?php

    include_once "Conectar.php";

    $obetoJasonJS = $_REQUEST['objetoJson'];
    $obj_phpd = json_decode($obetoJasonJS);
    $alumno = $obj_phpd->alumno;
    $profesor = $obj_phpd->profesor;
    
    $amon=0;
    $exp=0;
    $san=0;

    global $conexion;
    $ordenSQL = "select count(amonestacion.ID) as 'amon' from amonestacion where ID_Alumno='".$alumno."' and ID_Profesor='".$profesor."'";
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $fila = $resultado->fetch_array();
        while ($fila) {
            $amon = $fila["amon"];
            $fila = $resultado->fetch_array();
        }
    }

    $ordenSQL = "select count(expulsion.ID) as 'exp' from expulsion where expulsion.ID_Alumno='".$alumno."' and expulsion.ID_Profesor='".$profesor."'";
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $fila = $resultado->fetch_array();
        while ($fila) {
            $exp = $fila["exp"];
            $fila = $resultado->fetch_array();
        }
    }

    $ordenSQL = "select count(sancion.ID_Sancion) as 'san' from sancion where sancion.ID_Alumno='".$alumno."' and sancion.ID_Profesor='".$profesor."'";
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $fila = $resultado->fetch_array();
        while ($fila) {
            $san = $fila["san"];
            $fila = $resultado->fetch_array();
        }
    }
    $tot = $amon+$exp+$san;
    $obj_php = new stdClass();
    $obj_php->amonestaciones = $amon;
    $obj_php->expulsiones = $exp;
    $obj_php->sanciones = $san;
    $obj_php->total = $tot;

    echo json_encode($obj_php);
