<?php
require('populate_connect.php');
if(empty($_POST)) {
    $name=(isset($_POST['name']));
//print($name);
//print_r($_POST);
//$course = $_POST['course'];
//$grade = $_POST['grade'];
    $query = "DELETE FROM `SGT` WHERE `name`='$name'";
    mysqli_query($conn, $query);
}
if(mysqli_affected_rows($conn)>0){
    $output['success'] = true;
}
//if ($conn->query($sql) === TRUE) {
//    echo "Record deleted successfully";
//} else {
//    echo "Error deleting record: " . $conn->error;
//}
//
?>


