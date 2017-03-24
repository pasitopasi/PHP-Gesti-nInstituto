<?php

    include_once "Conectar.php";
    
    $obetoJasonJS = $_REQUEST['objetoJson'];
    $obj_phpd = json_decode($obetoJasonJS);

    $fechaMin = $obj_phpd->fechaMi;
    $fechaMax = $obj_phpd->fechaMa;
    
    $profesor = array();
    $curso = array();
    $amon = array();
    $exp = array();
    $san = array();
    $asig = array();
    $obj_php = new stdClass();
     
    $ordenSQL = 
"select (select concat(Nombre, ' ', Apellidos) from profesor where ID=ap.ID_Profesor) as 'Profesor', g.Denominación as Curso, 
(select count(*) from amonestacion 
   where ID_Profesor=ap.ID_Profesor
   and ID_Asignatura=ag.ID_Asignatura
   and Fecha Between '".$fechaMin."' and '".$fechaMax."'
	) as 'amonestaciones',
(select count(*) from expulsion 
   where ID_Profesor=ap.ID_Profesor
   and ID_Asignatura=ag.ID_Asignatura
   and Fecha Between '".$fechaMin."' and '".$fechaMax."'
	) as 'expulsiones',
(select count(*) from sancion 
   where ID_Profesor=ap.ID_Profesor
   and ID_Alumno in (select ID from alumno where ID_Grupo = g.ID)
   and Fecha Between '".$fechaMin."' and '".$fechaMax."'
	) as 'sanciones',
(select Nombre from asignatura where ID = ap.ID_Asignatura) as 'asignatura' 
 from grupo g, grupoasig ag, asigprof ap
  where
   g.ID = ag.ID_Grupo
	 and 
	ag.ID_Asignatura = ap.ID_Asignatura
order by Curso";
    global $conexion;
    $resultado = $conexion->query($ordenSQL);
    if ($resultado) {
        $fila = $resultado->fetch_array();
        while ($fila) {
            $profesor[] = $fila["Profesor"];
            $curso[] = $fila["Curso"];
            $amon[] = $fila["amonestaciones"];
            $exp[] = $fila["expulsiones"];
            $san[] = $fila["sanciones"];
            $asig[] = $fila["asignatura"];
            $fila = $resultado->fetch_array();
        }
    }
    
    $obj_php->profesor = $profesor;
    $obj_php->curso = $curso;
    $obj_php->amonestaciones = $amon;
    $obj_php->expulsiones = $exp;
    $obj_php->sanciones = $san;
    $obj_php->asignatura = $asig;

    echo json_encode($obj_php);
