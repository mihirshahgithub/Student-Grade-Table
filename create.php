<?php
require('populate_connect.php');
//if(!empty($_POST)){
//    $name=$_POST['Name'];
//    $course=$_POST['Course'];
//    $grade=$_POST['Grade'];
//    $query="INSERT INTO `SGT`(`Name`, `Course`, `Grade`) VALUES ('$name','$course','$grade')";
//    mysqli_query($conn,$query);
//}

$name = addslashes(trim($_POST['name']));
$course = addslashes(trim($_POST['course']));
$grade = (int)$_POST['grade'];
//$query = "INSERT INTO `SGT`(`name`, `course`, `grade`) VALUES ('$name','$course','$grade')";
//mysqli_query($conn, $query);
//echo json_encode($output);

function isValidGrade($grade){
    //Solution 1
    $grade=(int)$grade;
    $regex='/^100$|^[1-9]?[0-9]$/';
//    return($grade>=0 && $grade<=100);
    //Solution 2
//    $regex=  ?[0-9]$/';
    return preg_match($regex,$grade);


}

function isValidName($name){
  $regex='/[A-Za-z- ]*/';
    return preg_match($regex,$name);
}


function isValidCourse($course){
    $regex='/[ A-Za-z\- 0-9]*/';
        return preg_match($regex,$course);
}

if(isValidGrade($grade)==true && isValidCourse($course)==true && isValidName($name)==true ){
    $query = "INSERT INTO `SGT`(`name`, `course`, `grade`) VALUES ('$name','$course','$grade')";
    mysqli_query($conn, $query);
}

if(mysqli_affected_rows($conn)>0){
    $output['success'] = true;
    print(json_encode($output));
} else{
    $output['success'] = false;
    $output['errors']= 'Oh no, success failed';
   print(json_encode($output));
}
