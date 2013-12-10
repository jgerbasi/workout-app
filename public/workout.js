$(document).ready(function() {
  $('#saveWorkout').click(function() {
    // validation function call here
    workout = {}
    workout.name = $('#workoutName').val();
    workout.exercises = [];
    // Iterate through each row and push to the exercises array
    $('.exercise').each(function(i, obj) {
      exercise = {};
      exercise.name = $(this).find('.exerciseName').val();
      exercise.sets = $(this).find('.exerciseSets').val();
      exercise.rest = $(this).find('.exerciseRest').val();
      workout.exercises.push(exercise);
    });
    $.ajax({
      url: '/workouts',
      type: 'post',
      dataType: 'json',
      data: workout,
      complete: function(data){
        window.location = '/';
      },
    });
  });

  $('#addExercise').click(function() {
    var row = $("<tr>");
    row.addClass("exercise");

    var tdName = $("<td>");
    var inputName = $("<input>");
    inputName.addClass("exerciseName");
    tdName.append(inputName);
    row.append(tdName);

    var tdSets = $("<td>");
    var inputSets = $("<input>");
    inputSets.addClass("exerciseSets");
    tdSets.append(inputSets);
    row.append(tdSets);

    var tdRest = $("<td>");
    var inputRest = $("<input>");
    inputRest.addClass("exerciseRest");
    tdRest.append(inputRest);
    row.append(tdRest);

    $('#exerciseTable > tbody:last').append(row);
  });
});