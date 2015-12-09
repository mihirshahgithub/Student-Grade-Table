/**
 * Define all global variables here
 */
var student_name_input;
var student_course_input;
var student_grade_input;
var student_grade_average;
var databaseInfo;
var deleteData;

/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
//define global array that will hold the student objects (created separately)
var student_array = [];


/**
 * inputIds - id's of the elements that are used to add students
 * //Student Name will be added with the input id: "#student_name"
 * //Student Course will be added with the input id: "#course"
 * //Student grade will be added with the input id: "#student_grade
 * @type {string[]}
 */

/**
 * addClicked - Event Handler when user clicks the add button
 */
//Here, we are going to use a function called addClick to handle all events when the add button is clicked, and sent to the remote server
//in the document.ready, I'm calling the sgtOnClick() to load database
//addClick() call will load added entries after the page has loaded
//cancelClicked will wipe out any strings/data in the form input
//delete from database has the server delete the particular index from the student array and from the server itself

$(document).ready(function () {
    sgtOnClick();
    addClick();
    cancelClicked();
    $("body").on("click", ".del-btn", function () {
        console.log(this);
        var index = $(this).attr("student_index");
        console.log(student_array, "student_array before");
        delete student_array[index];
        console.log(student_array, "student_array before");
        $(this).parent().remove();
        deleteFromDatabase(index);
        gradeAverage();
    });
    //

});
function addClick(student_object) {
    //api key: string for api access
    //student object that contains all of this students data
    //addClick both adds student to remote server, and functions as dom creation
    $("#addClicked").click(function () {
        var student_name_input = $("#studentName").val();  //here, I'm setting up to add to the DOM
        $("#studentName").val(student_name_input);
        var student_course_input = $("#course").val();
        $("#course").val(student_course_input);
        var student_grade_input = $("#studentGrade").val();
        $("#studentGrade").val(student_grade_input);

        var student_object = {
            name: student_name_input,
            course: student_course_input,
            grade: student_grade_input,

        };
        console.log('student object is', student_object);
        student_array.push(student_object);
        //console.log(student_array);
        gradeAverage();
        //define student object, append to DOM
        //loop through array
        //for (var i = 0; i < student_array.length; i++) {
        //    if (student_array[i]) {
        //        var nName = $('<td>', {
        //            text: student_array[i].name
        //        });
        //
        //        var nCourse = $('<td>', {
        //            text: student_array[i].course
        //        });
        //        var nGrade = $('<td>', {
        //            text: student_array[i].grade
        //        });
        //
        //        var deleteB = $('<button>', {
        //            type: "button",
        //            class: "btn btn-danger del-btn",
        //            text: "Delete",
        //            student_index: i
        //        });
        //    }
        //}
        //var nRow = $('<tr>');
        //$(nRow).append(nName, nCourse, nGrade, deleteB);
        //$('#tableBody').append(nRow);

        $.ajax({
            dataType: 'json',
            url: 'create.php',
            data: {
                'name': student_object.name,
                'course': student_object.course,
                'grade': student_object.grade
            },
            cache: false,
            method: 'POST',
            success: function (response) {
                if(response.success) {
                    sgtOnClick();
                    console.log('AJAX was successful', response);
                }else{
                    console.error('Add failed');
                }
            },
            error: function(){
                console.error("Oh NO!, it failed");
            }

        });

    });


}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
//this will clear out the AddStudentForm
function cancelClicked() {
    $("#clickCancel").click(function () {
        $("#studentName").val('');
        $("#course").val('');
        $("#studentGrade").val('');
    })
}


/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */

/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 *
 */
//grade average function call calculates correct average of input; however, in the console, the value for sum and average come up as undefined. check up on this
function gradeAverage() {
    var sum = 0;
    var average = 0;
    var count = 0;
    for (var i = 0; i < student_array.length; i++) {
        if (student_array[i]) {
            count++;
            sum += parseInt(student_array[i].grade);
        }
    }
    average = sum / count;
    $(".avgGrade").text(Math.round(average));
    return average;

}


/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */

/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData() {
    //updateStudentList();
    gradeAverage();
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

//updateStudentList takes the student_object parameter and appends new rows. this function is called in sgtOnClick to get the database on click of the add button
function updateStudentList(student_object) {
    console.log("update studnet list called");
    console.log(typeof student_object);
    console.log(student_object);
    if (student_object) {
        var id = $('<td>', {
            text: student_object.ID
        });
        var nName = $('<td>', {
            text: student_object.Name
        });

        var nCourse = $('<td>', {
            text: student_object.Course
        });
        var nGrade = $('<td>', {
            text: student_object.Grade
        });

        var deleteB = $('<button>', {
            type: "button",
            class: "btn btn-danger del-btn",
            text: "Delete",

        }).attr('student_index',student_object.id);
        var nRow = $('<tr>');
        // $(nRow).append(nName, nCourse, nGrade, deleteB);
        $(nRow).append(id, nName, nCourse, nGrade, deleteB);
        $('#tableBody').append(nRow);
        // $("#tableBody").empty();
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */


/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
//set global variables to 0
function reset() {
    student_name_input = 0;
    student_course_input = 0;
    student_grade_input = 0;
    student_grade_average = 0;
    updateData();

}
reset();

/**
 * Listen for the document to load and reset the data to the initial state
 */

//pulls LF database onto SGT
function sgtOnClick() {
    $.ajax({
        dataType: 'json',
        //data: {
        //    //'api_key': '7cdgnHXVY4'
        //},
        method: 'GET',
        //url: 'http://s-apis.learningfuze.com/sgt/get',
        url: 'populate.php',
        success: function (response) {
            console.log('ths is my result:', response);
            //console.log('AJAX Success function called', response);
            //console.log(response.data[0]);
            $('#tableBody').html("");
            for (var i = 0; i < response.length; i++) {
                databaseInfo = response[i];
                //console.log(response.data.length);
                //console.log(response.data[i]);
                student_array.push(databaseInfo);
                updateStudentList(databaseInfo);
                gradeAverage();


            }


        }

    });
}

//takes parameter: index and deletes from database using ID property
function deleteFromDatabase(index) {
    //console.log("delete :", index);
    console.log(index);
    $.ajax({
        dataType: 'text',
        data: {
            //'api_key': '7cdgnHXVY4',
            student_id: index
            //'student_id':index

        },
        method: 'POST',
        //url: 'http://s-apis.learningfuze.com/sgt/delete',
        url:'http://localhost:8888/lfz/SGT/delete.php',
        success: function (response) {
            console.log('AJAX Success function called', response);
            if (response.success) {
                deleteData = true;
            }
        },
        error: function(x,t,m){
            console.log(m);
        }


    })

}
/*
function errorChecking(){
    $.ajax({
      dataType: 'json',
        data:{
            'api_key': '7cdgnHXVY4',
            'server':,
            'request:',
            'timeout:',
        },
        method: 'POST',
        url: 'http://s-apis.learningfuze.com/sgt/delete',
        success: function(response){
            console.log('AJAX success function called', response);
            if(response.success){
              console.log(response.success);
            } else {
                error: response
            }
        }
    });
}
*/

//function sort_by_grade() {
//    console.log('sort_by_grade func called');
//    $("tbody").empty();
//    var grade_arr = student_array;
//    grade_arr.sort(function (a, b) {
//        if (a.grade < b.grade) return -1;
//        if (a.grade > b.grade) return 1;
//        return 0;
//    });
//    console.log('grade_arr is now: ', grade_arr);
//    for (var i = 0; i < grade_arr.length; i++) {
//        updateStudentList(grade_arr[i]);
//    }
//}


//function sort_by_grade(){
//    console.log('sort_by_grade func called');
//    $("tbody").empty();
//    var grade_arr = student_array;
//    grade_arr.sort(function(a, b){
//        if(a.grade < b.grade) return -1;
//        if(a.grade > b.grade) return 1;
//        return 0;
//    });
//    console.log('grade_arr is now: ', grade_arr);
//    for(var i=0;i<grade_arr.length;i++){
//        updateStudentList(grade_arr[i]);
//    }
//}
//
//function sort_by_name(){
//    console.log('sort_by_grade func called');
//    $("tbody").empty();
//    var name_arr = student_array;
//    name_arr.sort(function(a, b){
//        if(a.name < b.name) return -1;
//        if(a.name > b.name) return 1;
//        return 0;
//    });
//    console.log('name_arr is now: ', name_arr);
//    for(var i=0;i<name_arr.length;i++){
//        updateStudentList(name_arr[i]);
//    }
//}
//
//function sort_by_course(){
//    console.log('sort_by_grade func called');
//    $("tbody").empty();
//    var course_arr = student_array;
//    course_arr.sort(function(a, b){
//        if(a.course < b.course) return -1;
//        if(a.course > b.course) return 1;
//        return 0;
//    });
//    console.log('course_arr is now: ', course_arr);
//    for(var i=0;i<course_arr.length;i++){
//        updateStudentList(course_arr[i]);
//    }
//}