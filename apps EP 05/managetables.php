<?php 

$conexion = mysqli_connect('localhost','root','');
mysqli_select_db($conexion,'espacio_publico');

$lat = $_POST['lat'];
$lng = $_POST['lng'];

// Para buscar por kilómetros en lugar de millas, reemplace 3959 con 6371.
//$lat = 6.230973593678723;
//$lng = -75.58385074138641;
$radio = 0.049; // en millas


$consulta = mysqli_query($conexion,"SELECT nombre, lat, lng, carnet,fotos
FROM vendedor
WHERE ( 3959 * ACOS( COS( RADIANS( $lat ) ) * COS( RADIANS( lat ) ) * COS( RADIANS( lng ) - RADIANS( $lng ) ) + SIN( RADIANS( $lat ) ) * SIN( RADIANS( lat ) ) ) ) < $radio");



while($row=mysqli_fetch_assoc($consulta)){
$output[]=$row;
}



print(json_encode($output));
mysqli_close($conexion);

?>