<?php
require('populate_connect.php');
//print_r($_POST);
if(!empty($_POST)) {
    $name=$_POST['name'];
//print($name);
//print_r($_POST);
//$course = $_POST['course'];
//$grade = $_POST['grade'];
    $query = "DELETE FROM `SGT` WHERE `name`='{$name}'";
    mysqli_query($conn, $query);
}
if(mysqli_affected_rows($conn)>0){
    $output['success'] = true;
//    print(json_encode($output));
}

//if ($conn->query($sql) === TRUE) {
//    echo "Record deleted successfully";
//} else {
//    echo "Error deleting record: " . $conn->error;
//}
//
?>


