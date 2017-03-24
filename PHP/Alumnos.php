<?php

    include_once "Conectar.php";

    $id_grupo = $_REQUEST['IDGrupo'];
    $obj_php = new stdClass();
    $arrayDatos = array();
    $arrayNombre = array();
    $arrayProfesor = new stdClass();
    $arrayIDpr = array();
    $arrayNombrepr = array();
    $ordenSQL = "select * from alumno where ID_Grupo = '" . $id_grupo . "'";
    global $conexion;
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $fila = $resultado->fetch_array();

        while ($fila) {
            $arrayDatos[] = $fila["ID"];
            $arrayNombre[] = $fila["Nombre"] . " " . $fila["Apellidos"];
            $fila = $resultado->fetch_array();
        }
    }

    $ordenSQL1 = "select * from profesor where ID in (select ID_Profesor from asigprof where ID_Asignatura in (select ID_Asignatura from grupoasig where ID_Grupo = '" . $id_grupo . "'))";
    $resultado1 = $conexion->query($ordenSQL1);
    if ($resultado1) {
        $fila1 = $resultado1->fetch_array();

        while ($fila1) {
            $arrayIDpr[] = $fila1["ID"];
            $arrayNombrepr[] = $fila1["Nombre"] . " " . $fila1["Apellidos"];
            $fila1 = $resultado1->fetch_array();
        }
    }

    $arrayProfesor->ID = $arrayIDpr;
    $arrayProfesor->Nombre = $arrayNombrepr;

    $obj_php->ID = $arrayDatos;
    $obj_php->Nombre = $arrayNombre;
    $obj_php->Profesor = $arrayProfesor;

    echo json_encode($obj_php);
