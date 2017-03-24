<?php

    include_once "Conectar.php";
    global $conexion;
    
    $idAlumno = $_REQUEST['idAlumno'];
    $correo="";
    $nombre="";
    $Alumno="";
    $ordenSQL = "select concat(familiar.Nombre, ' ', familiar.Apellidos) as 'Familiar', ( select concat(alumno.Nombre, ' ', alumno.Apellidos) from alumno where ID='".$idAlumno."') as 'Alumno' , familiar.Correo as 'Correo' from familiar where ID = (select ID_Familia from alumno where ID ='".$idAlumno."');";
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $fila = $resultado->fetch_array();
        while ($fila) {
            $nombre = $fila["Familiar"];
            $correo = $fila["Correo"];
            $Alumno = $fila["Alumno"];
            
            $fila = $resultado->fetch_array();
        }
    }
    $ordenSQL = "update alumno set AlaProxima='si' where ID='".$idAlumno."'";
    $resultado1 = $conexion->query($ordenSQL);
    if ($resultado1) {
        $cuenta = $conexion->affected_rows;
        if($cuenta != 0){
            $mensaje="Sr. o Sra. ".$nombre."\n".
             "Le comunico que su hijo/a: ".$Alumno." está muy revoltoso ultimamente y molesta en clase.\n".
             "\nFD.: I.E.S. Leonardo Da Vinci";
            if (mail($correo, 'Aviso', $mensaje)) {
                echo 'si';
            } else {
                echo 'no';
            }
        } else {
            echo 'no';
        }
    } else {
        echo 'no';
    }
    