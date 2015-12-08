<?php
require('populate_connect.php');
 $query="SELECT * FROM `SGT`";

$result=mysqli_query($conn, $query);
//print_r($result);
if(mysqli_num_rows($result)>0){
    while($row=mysqli_fetch_assoc($result)){
        $output[]=$row;
    }
    print(json_encode($output));
}
