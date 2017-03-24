<?php

    include_once "Conectar.php";

    $obetoJasonJS = $_REQUEST['objetoJson'];
    $obj_php = json_decode($obetoJasonJS);

    $Amonestar = $obj_php->Amonestar;
    $Expulsar = $obj_php->Expulsar;
    $sancion = $obj_php->sancion;
    $id_alumno = $obj_php->alumno;
    $id_profesor = $obj_php->profesor;
    
    $salida = false;
    $salidaA = false;
    $salidaE = false;

    $ordenSQL = "insert into sancion values( null,'" . $id_alumno . "', CURDATE(), CURTIME(), '" . $id_profesor . "', '" . $sancion . "')";
    global $conexion;
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $cuenta = $conexion->affected_rows;
        if ($cuenta != 0) {
            $salida = true;
        }else{
            $salida = false;
        }
    }
    $ultimo_ID = $conexion->insert_id;
    $expulsionesString = implode("','", $Expulsar);
    $actualizarExp = "update expulsion set ID_Sancion='".$ultimo_ID."', FechaFirmaJefatura=curdate(), FechaFirmaFamiliar=curdate()  where ID in ('".$expulsionesString."')";
    $resultadoA = $conexion->query($actualizarExp);
    if ($resultadoA) {
        $cuenta = $conexion->affected_rows;
        if ($cuenta != 0) {
            $salidaA = true;
        }else{
            $salidaA = false;
        }
    }
    $amonestacionesString = implode("','", $Amonestar);
    $actualizarAmon = "update amonestacion set ID_Sancion='".$ultimo_ID."', FechaFirmaJEfatura=curdate(), FechaFirmaFamiliar=curdate() where ID in ('".$amonestacionesString."')";
    $resultadoE = $conexion->query($actualizarAmon);
    if ($resultadoE) {
        $cuenta = $conexion->affected_rows;
        if ($cuenta != 0) {
            $salidaE = true;
        }else{
            $salidaE = false;
        }
    }
    $actualizarALUMNO = "update alumno set AlaProxima=null where ID='".$id_alumno."'";
    $resultadoAL = $conexion->query($actualizarALUMNO);
    if ($resultadoAL) {
        $cuenta = $conexion->affected_rows;
        if ($cuenta != 0) {
            $salidaE = true;
        }else{
            $salidaE = false;
        }
    }
    echo $salida;