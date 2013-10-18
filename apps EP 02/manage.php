<?php 

$conexion=mysqli_connect("localhost","root","");
mysqli_select_db($conexion,"espacio_publico");
$consulta=mysqli_query($conexion,"SELECT * FROM funcionarios");
while($row=mysqli_fetch_assoc($consulta)){
$output[]=$row;
}
echo json_encode($output);
mysqli_close($conexion);

 ?>