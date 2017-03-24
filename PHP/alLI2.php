<?php
    include_once "Conectar.php";
    $id_grupo = $_REQUEST['idgrupo'];
    global $conexion;
    $ordenSQL = "
select a.ID, a.Motivo, (select Denominación from grupo where ID = (select ID_Grupo from grupoasig where ID_Asignatura=a.ID_Asignatura)) as 'grupo',
 a.Fecha,(select concat(Nombre, ' ', Apellidos) from alumno where ID = a.ID_Alumno) as 'alum', a.FechaFirmaJEfatura, a.FechaFirmaFamiliar
 from amonestacion a
 where (a.FechaFirmaJEfatura is null or a.FechaFirmaFamiliar is null)
 and a.ID_Asignatura in (select ID_Asignatura from grupoasig where ID_Grupo='".$id_grupo."')
 order by a.Fecha desc, a.Hora desc
    ";
    $amonestaciones = new stdClass();
    $arrayID = array();
    $arrayMotivo = array();
    $arrayFecha = array();
    $arrayAlum = array();
    $arrayGrupo = array();
    $arrayFechaFirmaJEfatura = array();
    $arrayFechaFirmaFamiliar = array();
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $fila = $resultado->fetch_array();
        while ($fila) {
            $arrayID[] = $fila["ID"];
            $arrayMotivo[] = $fila["Motivo"];
            $arrayFecha[] = $fila["Fecha"];
            $arrayAlum[] = $fila["alum"];
            $arrayGrupo[] = $fila["grupo"];
            $arrayFechaFirmaJEfatura[] = $fila["FechaFirmaJEfatura"];
            $arrayFechaFirmaFamiliar[] = $fila["FechaFirmaFamiliar"];
            $fila = $resultado->fetch_array();
        }
    }
    $amonestaciones->ID = $arrayID;
    $amonestaciones->Fecha = $arrayFecha;
    $amonestaciones->Motivo = $arrayMotivo;
    $amonestaciones->Alumno = $arrayAlum;
    $amonestaciones->Grupo = $arrayGrupo;
    $amonestaciones->FechaFirmaJefatura = $arrayFechaFirmaJEfatura;
    $amonestaciones->FechaFirmaFamiliar = $arrayFechaFirmaFamiliar;
    
    $ordenSQL1 = "
select e.ID, e.Motivo, e.Fecha, (select concat(Nombre, ' ', Apellidos) from alumno where ID = e.ID_Alumno) as 'alum', 
(select Denominación from grupo where ID = (select ID_Grupo from grupoasig where ID_Asignatura=e.ID_Asignatura)) as 'grupo',
e.FechaFirmaJefatura, e.FechaFirmaFamiliar
 from expulsion e
 where (e.FechaFirmaJefatura is null or e.FechaFirmaFamiliar is null)
 and e.ID_Asignatura in (select ID_Asignatura from grupoasig where ID_Grupo='".$id_grupo."')
 order by e.Fecha desc, e.Hora desc
    ";
    $expulsiones = new stdClass();
    $arrayIDE = array();
    $arrayMotivoE = array();
    $arrayFechaE = array();
    $arrayAlumE = array();
    $arrayGrupoE = array();
    $arrayFechaFirmaJEfaturaE = array();
    $arrayFechaFirmaFamiliarE = array();
    $resultado1 = $conexion->query($ordenSQL1);
    if ($resultado1) {
        $fila1 = $resultado1->fetch_array();
        while ($fila1) {
            $arrayIDE[] = $fila1["ID"];
            $arrayMotivoE[] = $fila1["Motivo"];
            $arrayFechaE[] = $fila1["Fecha"];
            $arrayAlumE[] = $fila1["alum"];
            $arrayGrupoE[] = $fila1["grupo"];
            $arrayFechaFirmaJEfaturaE[] = $fila1["FechaFirmaJefatura"];
            $arrayFechaFirmaFamiliarE[] = $fila1["FechaFirmaFamiliar"];
            $fila1 = $resultado1->fetch_array();
        }
    }
    $expulsiones->ID = $arrayIDE;
    $expulsiones->Fecha = $arrayFechaE;
    $expulsiones->Motivo = $arrayMotivoE;
    $expulsiones->Alumno = $arrayAlumE;
    $expulsiones->Grupo = $arrayGrupoE;
    $expulsiones->FechaFirmaJefatura = $arrayFechaFirmaJEfaturaE;
    $expulsiones->FechaFirmaFamiliar = $arrayFechaFirmaFamiliarE;

    $obj_php = new stdClass();
    $obj_php->Amonestaciones = $amonestaciones;
    $obj_php->Expulsiones = $expulsiones;
    echo json_encode($obj_php);