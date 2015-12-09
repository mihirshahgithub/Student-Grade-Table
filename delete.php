<?php
require('populate_connect.php');
//print_r($_POST);
if(!empty($_POST)) {
    $delete_id=$_POST['student_id'];
//print($name);
//print_r($_POST);
//$course = $_POST['course'];
//$grade = $_POST['grade'];
    $query = "DELETE FROM `SGT` WHERE `ID`='$delete_id'";
    mysqli_query($conn, $query);
} else{
    print_r('POST IS EMPTY');
}
if(mysqli_affected_rows($conn)>0){
    $output['success'] = true;
    $result=json_encode($output);
    print_r($result);
} else{
    print('Operation Failed');
}

//if ($conn->query($sql) === TRUE) {
//    echo "Record deleted successfully";
//} else {
//    echo "Error deleting record: " . $conn->error;
//}
//
?>


