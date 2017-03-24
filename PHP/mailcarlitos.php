<?php

include_once 'Conectar.php';
global $conexion;


$query = "select * from familiar where ID = 'FAM00'";
$result = $conexion->query($query);
if ($conexion->affected_rows > 0) {
    $row = $result->fetch_array();
    $nombre = $row["Nombre"];
    $correo = $row['Correo'];
    $mensaje = "Sr/Sra asf, nos ponemos en contacto con usted para comunicarle que su hijo asf"
            . "no está teniendo el comportamiento adecuado en clase. Póngase en contacto con el tutor lo antes posible. Gracias";
    if (mail($correo, "Mal comportamiento de ", $mensaje)) {
        echo "Correo enviado";
    }
} else {
    $numerror = $conexion->errno;
    $descrerror = $conexion->error;
    echo "Se ha producido un error nº $numerror que corresponde a: $descrerror.";
}