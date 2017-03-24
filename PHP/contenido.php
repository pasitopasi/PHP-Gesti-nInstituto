<?php

    include_once "Conectar.php";
    $id_alum = $_REQUEST['idAlumn'];
    $amonestaciones = new stdClass();
    $expulsiones = new stdClass();
    $arrayID = array();
    $arrayFecha = array();
    $arrayHora = array();
    $arrayMotivo = array();
    $arrayID_Sancion = array();
    $arrayProf = array();
    $arrayAsig = array();
    $arrayFechaFirmaJEfatura = array();
    $arrayFechaFirmaFamiliar = array();
    
    $arrayIDE = array();
    $arrayFechaE = array();
    $arrayHoraE = array();
    $arrayMotivoE = array();
    $arrayID_SancionE = array();
    $arrayProfE = array();
    $arrayAsigE = array();
    $arrayFechaFirmaJEfaturaE = array();
    $arrayFechaFirmaFamiliarE = array();
    
    $ordenSQL = "select ID, FechaFirmaJEfatura, FechaFirmaFamiliar, Fecha, Hora, (select Nombre from asignatura where ID=ID_Asignatura) as 'Asignatura' , (select concat(Nombre, ' ', Apellidos) from profesor where ID=ID_Profesor) as 'Profesor', amonestacion.Motivo, ID_Sancion from amonestacion where ID_Alumno='".$id_alum."' order by Fecha desc, Hora desc";
    global $conexion;
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $fila = $resultado->fetch_array();
        while ($fila) {
            $arrayID[] = $fila["ID"];
            $arrayFecha[] = $fila["Fecha"];
            $arrayHora[] = $fila["Hora"];
            $arrayMotivo[] = $fila["Motivo"];
            $arrayID_Sancion[] = $fila["ID_Sancion"];
            $arrayProf[] = $fila["Profesor"];
            $arrayAsig[] = $fila["Asignatura"];
            $arrayFechaFirmaJEfatura[] = $fila["FechaFirmaJEfatura"];
            $arrayFechaFirmaFamiliar[] = $fila["FechaFirmaFamiliar"];
            $fila = $resultado->fetch_array();
        }
    }
    $amonestaciones->ID = $arrayID;
    $amonestaciones->Fecha = $arrayFecha;
    $amonestaciones->Hora = $arrayHora;
    $amonestaciones->Motivo = $arrayMotivo;
    $amonestaciones->ID_Sancion = $arrayID_Sancion;
    $amonestaciones->Profesor = $arrayProf;
    $amonestaciones->FechaFirmaJefatura = $arrayFechaFirmaJEfatura;
    $amonestaciones->FechaFirmaFamiliar = $arrayFechaFirmaFamiliar;
    $amonestaciones->Asignatura = $arrayAsig;
    
    $ordenSQL = "select ID, FechaFirmaJefatura, FechaFirmaFamiliar, ID_Alumno, Fecha, Hora, (select Nombre from asignatura where ID=ID_Asignatura) as 'Asignatura' , (select concat(Nombre, ' ', Apellidos) from profesor where ID=ID_Profesor) as 'Profesor', expulsion.Motivo, ID_Sancion from expulsion where ID_Alumno = '" . $id_alum . "' order by Fecha desc, Hora desc";
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $fila = $resultado->fetch_array();
        while ($fila) {
            $arrayIDE[] = $fila["ID"];
            $arrayFechaE[] = $fila["Fecha"];
            $arrayHoraE[] = $fila["Hora"];
            $arrayMotivoE[] = $fila["Motivo"];
            $arrayID_SancionE[] = $fila["ID_Sancion"];
            $arrayProfE[] = $fila["Profesor"];
            $arrayAsigE[] = $fila["Asignatura"];
            $arrayFechaFirmaJEfaturaE[] = $fila["FechaFirmaJefatura"];
            $arrayFechaFirmaFamiliarE[] = $fila["FechaFirmaFamiliar"];

            $fila = $resultado->fetch_array();
        }
    }

    $expulsiones->ID = $arrayIDE;
    $expulsiones->Fecha = $arrayFechaE;
    $expulsiones->Hora = $arrayHoraE;
    $expulsiones->Motivo = $arrayMotivoE;
    $expulsiones->ID_Sancion = $arrayID_SancionE;
    $expulsiones->Profesor = $arrayProfE;
    $expulsiones->Asignatura = $arrayAsigE;
    $expulsiones->FechaFirmaJefatura = $arrayFechaFirmaJEfaturaE;
    $expulsiones->FechaFirmaFamiliar = $arrayFechaFirmaFamiliarE;
    
    $obj_php = new stdClass();
    $obj_php->Amonestaciones = $amonestaciones;
    $obj_php->Expulsiones = $expulsiones;
    echo json_encode($obj_php);
