<?php

    include_once "Conectar.php";
    
    $obetoJasonJS = $_REQUEST['objetoJson'];
    $obj_phpd = json_decode($obetoJasonJS);

    $id_ = $obj_phpd->id;
    $fechaMin = $obj_phpd->fechaMi;
    $fechaMax = $obj_phpd->fechaMa;
    
    $obj_php = new stdClass();
    $arraAmon = new stdClass();
    $arraExpul = new stdClass();
    $arraSan = new stdClass();
    
    $arraAmonM = array();
    $arraAmonP = array();
    $arraAmonA = array();
    $arraAmonF = array();
    
    $arraExpM = array();
    $arraExpP = array();
    $arraExpA = array();
    $arraExpF = array();
    
    $arraSanP = array();
    $arraSanM = array();
    $arraSanF = array();
    
    $direccion;
    $poblacion;

    $ordenSQL = "select * from alumno where ID = '" . $id_ . "'";
    global $conexion;
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $fila = $resultado->fetch_array();

        while ($fila) {
            $direccion = $fila["Direccion"];
            $poblacion = $fila["Poblacion"];
            $fila = $resultado->fetch_array();
        }
    }
    $ordenSQL = "select Fecha, (select Nombre from asignatura where ID=ID_Asignatura) as 'Asignatura' , (select concat(Nombre, ' ', Apellidos) from profesor where ID=ID_Profesor) as 'Profesor', amonestacion.Motivo from amonestacion where ID_Alumno='" . $id_ . "' and Fecha Between '".$fechaMin."' and '".$fechaMax."'";
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $fila = $resultado->fetch_array();
        while ($fila) {
            $arraAmonM[] = $fila["Motivo"];
            $arraAmonF[] = $fila["Fecha"];
            $arraAmonA[] = $fila["Asignatura"];
            $arraAmonP[] = $fila["Profesor"];
            $fila = $resultado->fetch_array();
        }
        $arraAmon->fecha = $arraAmonF;
        $arraAmon->motivo = $arraAmonM;
        $arraAmon->prof = $arraAmonP;
        $arraAmon->asig = $arraAmonA;
    }
    $ordenSQL = "select Fecha, (select Nombre from asignatura where ID=ID_Asignatura) as 'Asignatura' , (select concat(Nombre, ' ', Apellidos) from profesor where ID=ID_Profesor) as 'Profesor', expulsion.Motivo from expulsion where ID_Alumno='" . $id_ . "' and Fecha Between '".$fechaMin."' and '".$fechaMax."'";
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $fila = $resultado->fetch_array();
        while ($fila) {
            $arraExpF[] = $fila["Fecha"];
            $arraExpM[] = $fila["Motivo"];
            $arraExpA[] = $fila["Asignatura"];
            $arraExpP[] = $fila["Profesor"];
            $fila = $resultado->fetch_array();
        }
        $arraExpul->fecha = $arraExpF;
        $arraExpul->motivo = $arraExpM;
        $arraExpul->prof = $arraExpP;
        $arraExpul->asig = $arraExpA;
    }
    $ordenSQL = "select Fecha,  (select concat(Nombre, ' ', Apellidos) from profesor where ID=ID_Profesor) as 'Profesor', sancion.Sancion from sancion where ID_Alumno='".$id_."' and Fecha Between '".$fechaMin."' and '".$fechaMax."'";
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $fila = $resultado->fetch_array();
        while ($fila) {
            $arraSanF[] = $fila["Fecha"];
            $arraSanM[] = $fila["Sancion"];
            $arraSanP[] = $fila["Profesor"];
            $fila = $resultado->fetch_array();
        }
        $arraSan->fecha = $arraSanF;
        $arraSan->motivo = $arraSanM;
        $arraSan->prof = $arraSanP;
    }

    $obj_php->dir = $direccion;
    $obj_php->pob = $poblacion;
    $obj_php->amonestaciones = $arraAmon;
    $obj_php->expulsiones = $arraExpul;
    $obj_php->sanciones = $arraSan;

    echo json_encode($obj_php);
