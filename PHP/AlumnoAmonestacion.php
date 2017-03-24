<?php
    include_once "Conectar.php";
    
    $id_grupo = $_REQUEST['grupo'];
    
    $ordenSQL="select * from alumno where ID_Grupo = '".$id_grupo."'";
    global $conexion;
    $resultado=$conexion->query($ordenSQL);
    if ($resultado){
        $fila=$resultado->fetch_array();
        $obj_php = new stdClass();
        $arrayDatos = array();
        $arrayNombre = array();
        while($fila){
            $arrayDatos[]=$fila["ID"];
            $arrayNombre[]=$fila["Nombre"]." ".$fila["Apellidos"];
            $fila=$resultado->fetch_array();
        }
        
        $obj_php->ID =  $arrayDatos;
        $obj_php->Nombre = $arrayNombre;
    
        echo json_encode($obj_php);
    }