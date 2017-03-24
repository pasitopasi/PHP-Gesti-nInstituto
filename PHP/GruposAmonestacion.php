<?php
    include_once "Conectar.php";
    
    $id_profesor = $_REQUEST['profesor'];
    
    $ordenSQL="select * from grupo where ID in (select ID_Grupo from grupoasig where grupoasig.ID_Asignatura in (select ID_Asignatura from asigprof where ID_Profesor='".$id_profesor."')) order by Denominación";
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