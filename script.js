/**
 * Define all global variables here
 */
//Here, I'm setting up all the possible global variables that could exist, and that could be useful moving forward
/*unnecessary variables
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
//Here, we are going to use a function called addClick to handle all events when the add button is clicked
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
        deleteFromDatabase();
        gradeAverage();
    });
    //

});
function addClick(student_object) {
    //api key: string for api access
    //student object that contains all of this students data
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
            grade: student_grade_input
        };
        console.log('student object is' + student_object);
        student_array.push(student_object);
        //console.log(student_array);
        gradeAverage();
        //define student object, append to DOM
        //loop through array
        for (var i = 0; i < student_array.length; i++) {
            if (student_array[i]) {
                var nName = $('<td>', {
                    text: student_array[i].name
                });

                var nCourse = $('<td>', {
                    text: student_array[i].course
                });
                var nGrade = $('<td>', {
                    text: student_array[i].grade
                });

                var deleteB = $('<button>', {
                    type: "button",
                    class: "btn btn-danger del-btn",
                    text: "Delete",
                    student_index: i
                });
            }
        }
        var nRow = $('<tr>');
        $(nRow).append(nName, nCourse, nGrade, deleteB);
        $('#tableBody').append(nRow);

        $.ajax({
            dataType: 'json',
            url: 'http://s-apis.learningfuze.com/sgt/create',
            data: {
                'api_key': '7cdgnHXVY4',
                'name': student_object.name,
                'course': student_object.course,
                'grade': student_object.grade
            },
            method: 'POST',
            success: function(response) {

                console.log('AJAX was successful', response);
            }

        });

    });


}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
//this will clear out the AddStudentForm  (now we have to figure out a way to add new rows of data, likely using a for loop)
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
};
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */


function updateStudentList(student_object) {
    if (student_object) {
        var id = $('<td>', {
            text: student_object.id
        });
        var nName = $('<td>', {
            text: student_object.name
        });

        var nCourse = $('<td>', {
            text: student_object.course
        });
        var nGrade = $('<td>', {
            text: student_object.grade
        });

        var deleteB = $('<button>', {
            type: "button",
            class: "btn btn-danger del-btn",
            text: "Delete",
            // student_index: i
        });
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
    //updateStudentList()
};
reset();

/**
 * Listen for the document to load and reset the data to the initial state
 */


function sgtOnClick() {
    $.ajax({
        dataType: 'json',
        data: {
            'api_key': '7cdgnHXVY4'
        },
        method: 'POST',
        url: 'http://s-apis.learningfuze.com/sgt/get',
        success: function (response) {
            //console.log('AJAX Success function called', response);
            //console.log(response.data[0]);
            for (var i = 0; i < response.data.length; i++) {
                databaseInfo = response.data[i];
                //console.log(response.data.length);
                //console.log(response.data[i]);
                student_array.push(databaseInfo);
                updateStudentList(databaseInfo);
                gradeAverage();


            }


        }

    });
}

/*
 function deleteDatabase() {
 $("body").on("click", ".del-btn", function () {
 console.log(this);
 var index = $(this).attr("student_index");
 console.log(student_array, "student_array before");
 delete student_array[index];
 console.log(student_array, "student_array before");
 $(this).parent().remove();
 sgtOnClick();

 });
 }
 */
    function deleteFromDatabase(id) {

        $.ajax({
            dataType: 'json',
            data: {
                'api_key': '7cdgnHXVY4',
                'student_id': id
            },
            method: 'POST',
            url: 'http://s-apis.learningfuze.com/sgt/delete',
            success: function (response) {
                console.log('AJAX Success function called', response);
                if(response.success){
                    deleteData=true;
                }

            }


        })

    }
