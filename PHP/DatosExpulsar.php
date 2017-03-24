<?php
    include_once "Conectar.php";
    
    $obetoJasonJS = $_REQUEST['objetoJson'];
    $obj_php = json_decode($obetoJasonJS);
    
    $id_profesor = $obj_php->profesor;
    $id_grupo = $obj_php->grupo;
    $id_asignatura = $obj_php->asignatura;
    $id_alumno = $obj_php->alumno;
    $fecha = $obj_php->fecha;
    $hora = $obj_php->hora;
    $motivo = $obj_php->motivo;
    $tarea = $obj_php->tarea;
    
    $ordenSQL="insert into expulsion values(null,'".$id_alumno."', '".$fecha."', '".$hora."', '".$id_asignatura."', null, null, '".$id_profesor."', '".$motivo."', null, '".$tarea."')";
    global $conexion;
    $resultado=$conexion->query($ordenSQL);
    if ($resultado){
        $cuenta = $conexion->affected_rows;
        if($cuenta!=0){
            echo true;
        }else{
            echo false;
        }
    }