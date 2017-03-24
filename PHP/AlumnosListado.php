<?php
    include_once "Conectar.php";
    global $conexion;
    
    $id_grupo = $_REQUEST['IDGrupo'];
    
    $obj_php = new stdClass();
    $arrayDatos = array();
    $arrayNombre = array();
    $arrayAmon = array();
    $arrayExpul = array();
    $arraySan = array();
    $arrayAlaProxima = array();
    
    $ordenSQL="select * from alumno where ID_Grupo = '".$id_grupo."'";
    $resultado=$conexion->query($ordenSQL);
    if ($resultado){
        $fila=$resultado->fetch_array();
        while($fila){
            $arrayDatos[]=$fila["ID"];
            $arrayAlaProxima[]=$fila["AlaProxima"];
            $arrayNombre[]=$fila["Nombre"]." ".$fila["Apellidos"];
            $ordenSQL="select count(*) as 't' from amonestacion where ID_Alumno='".$fila["ID"]."'";
            $resultado1=$conexion->query($ordenSQL);
            if ($resultado1){
                $fila1=$resultado1->fetch_array();
                while($fila1){
                    $arrayAmon[]=$fila1["t"];
                    $fila1=$resultado1->fetch_array();
                }
            }
            $ordenSQL="select count(*) as 't' from expulsion where ID_Alumno='".$fila["ID"]."'";
            $resultado2=$conexion->query($ordenSQL);
            if ($resultado2){
                $fila2=$resultado2->fetch_array();
                while($fila2){
                    $arrayExpul[]=$fila2["t"];
                    $fila2=$resultado2->fetch_array();
                }
            }
            $ordenSQL="select count(*) as 't' from sancion where ID_Alumno='".$fila["ID"]."'";
            $resultado3=$conexion->query($ordenSQL);
            if ($resultado3){
                $fila3=$resultado3->fetch_array();
                while($fila3){
                    $arraySan[]=$fila3["t"];
                    $fila3=$resultado3->fetch_array();
                }
            }
            $fila=$resultado->fetch_array();
        }
    }
    $obj_php->ID =  $arrayDatos;
    $obj_php->Nombre = $arrayNombre;
    $obj_php->AlaProxima = $arrayAlaProxima;
    $obj_php->Amonestacion = $arrayAmon;
    $obj_php->Expulsion = $arrayExpul;
    $obj_php->Sancion = $arraySan;
    
    echo json_encode($obj_php);