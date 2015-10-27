/**
 * Define all global variables here
 */
//Here, I'm setting up all the possible global variables that could exist, and that could be useful moving forward
/*unnecessary variables
 var student_name_table;
 var student_course_table;
 var student_grade_table;
 var operations_table;

 var delete_button;
 var add_button;
 var cancel_button;
 */
var student_name_input;
var student_course_input;
var student_grade_input;
var student_grade_average;
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
    addClick();
    //by adding a cancelClicked() into the document.ready, I ensure that it will load after all other events have subsided
    //prevents double adding data upon clicking add button
    cancelClicked();
    $("body").on("click", ".del-btn", function () {
        console.log(this);
        var index = $(this).attr("student_index");
        console.log(student_array, "student_array before");
        delete student_array[index];
        console.log(student_array, "student_array before");
        $(this).parent().remove();

        gradeAverage();
    });
    //

});
function addClick() {
    $("#addClicked").click(function () {
        var student_name_input = $("#studentName").val();  //here, I'm setting up to add to the DOM
        $("#studentName").val(student_name_input);      //here, I add #studentName to the DOM
        var student_course_input = $("#course").val();
        $("#course").val(student_course_input);
        var student_grade_input = $("#studentGrade").val();
        $("#studentGrade").val(student_grade_input);

        var student_object = {
            name: student_name_input,
            course: student_course_input,
            grade: student_grade_input
        };

        student_array.push(student_object);
        console.log(student_array);
        gradeAverage();
        //define student object, append to DOM
        //loop through array; figure out why there are double entries, etc.
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
        var nRow = $('<tr>', {
            id: "tableBody"
        });
        $('#tableBody').prepend(nRow);
        $(nRow).append(nName, nCourse, nGrade, deleteB);

        /*student_object.name=student_name_input;
         $("#tableBody").append(student_object.name);
         student_object.course=student_course_input;
         $("#tableBody").append(student_object.course);
         student_object.grade=student_grade_input;
         $("#tableBody").append(student_object.grade);*/

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

    for (var i = 0; i < student_array.length; i++) {
        if (student_array[i]) {
            sum += parseInt(student_array[i].grade);
        }
    }
    average = sum / student_array.length;
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
    updateStudentList();
    gradeAverage();
};
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
//a bit lost on this function. My dom creation occurred in the addClick function, not its own function
function updateStudentList() {
    for (var list = 0; list < student_array.length; list++) {
        $("#tableBody").empty();
    }
    /**
     * addStudentToDom - take in a student object, create html elements from the values and then append the elements
     * into the .student_list tbody
     * @param studentObj
     */
//function domCreation(i) {
    /*  for(var i=0;i<student_array.length;i++) {
     var nName = $('<td>', {
     text: student_array[i].name
     });
     var nCourse = $('<td>', {
     text: student_array[i].course
     });
     var nGrade = $('<td>', {
     text: student_array[i].grade
     });
     }
     var nRow = $('<tr>', {
     id: "tableBody"
     });
     $('#tableBody').prepend(nRow);
     $(nRow).append(nName, nCourse, nGrade);
     } */

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
        updateStudentList()
    };
    reset();
}
/**
 * Listen for the document to load and reset the data to the initial state
 */