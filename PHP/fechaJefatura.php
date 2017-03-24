<?php

    include_once "Conectar.php";
    global $conexion;
    $id = $_REQUEST['id'];
    if($id[0]=='A'){
        $idAmonestacion = substr($id, 1);
        $ordenSQL = "update amonestacion set FechaFirmaJEfatura = curdate() where ID = '".$idAmonestacion."'";
        $resultado = $conexion->query($ordenSQL);
        if ($resultado) {
            echo 'si';
        }
    }
    if($id[0]=='E'){
        $idExpulsion = substr($id, 1);
        $ordenSQL = "update expulsion set FechaFirmaJefatura = curdate() where ID = '".$idExpulsion."'";
        $resultado = $conexion->query($ordenSQL);
        if ($resultado) {
            echo 'si';
        }
    }