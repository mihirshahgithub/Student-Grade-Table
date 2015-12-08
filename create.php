<?php
require('populate_connect.php');
//if(!empty($_POST)){
//    $name=$_POST['Name'];
//    $course=$_POST['Course'];
//    $grade=$_POST['Grade'];
//    $query="INSERT INTO `SGT`(`Name`, `Course`, `Grade`) VALUES ('$name','$course','$grade')";
//    mysqli_query($conn,$query);
//}
$output['success'] = false;

$name = $_POST['name'];
$course = $_POST['course'];
$grade = $_POST['grade'];
$query = "INSERT INTO `SGT`(`name`, `course`, `grade`) VALUES ('$name','$course','$grade')";
mysqli_query($conn, $query);

if(mysqli_affected_rows($conn)>0){
    $output['success'] = true;
}

echo json_encode($output);