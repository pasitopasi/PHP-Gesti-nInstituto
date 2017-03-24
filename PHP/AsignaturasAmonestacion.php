<?php
    include_once "Conectar.php";
    
    $obetoJasonJS = $_REQUEST['objetoJson'];
    $obj_php = json_decode($obetoJasonJS);
    
    $id_grupo = $obj_php->ID_Grupo;
    $id_profesor = $obj_php->profesor;
    
    $ordenSQL="select * from asignatura where ID in (select ID_Asignatura from asigprof where ID_Asignatura in (select ID_Asignatura from grupoasig where ID_Grupo = '".$id_grupo."') and ID_Profesor='".$id_profesor."')";
    global $conexion;
    $resultado=$conexion->query($ordenSQL);
    if ($resultado){
        $fila=$resultado->fetch_array();
        $obj_php = new stdClass();
        $arrayID = array();
        $arrayNombre = array();
        while($fila){
            $arrayDatos[]=$fila["ID"];
            $arrayNombre[]=$fila["Nombre"];
            $fila=$resultado->fetch_array();
        }
        
        $obj_php->ID =  $arrayDatos;
        $obj_php->Nombre = $arrayNombre;
    
        echo json_encode($obj_php);
    }