$(document).ready(function() {
  var currentdate = new Date(); 
  var hour = currentdate.getHours();
  var min = currentdate.getMinutes();
  var period = "am";
  if (hour > 12) {
    hour = hour - 12;
    period = "pm";
  }
  if (min < 10) {
    min = "0" + min
  }
  var datetime =  currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + hour + ":"  
                  + min + " "
                  + period;
  console.log(datetime);
  $('#date').html(datetime);

  $('#finishWorkout').click(function() {
    // validation function call here
    var session = {}
    session.date = currentdate;
    session.exercises = [];
    // Iterate through each row and push to the exercises array
    $('.exercise').each(function(i, obj) {
      var exercise = {};
      exercise.name = $(this).find('.exerciseName').html();
      exercise.sets = [];
      $(this).find('.exerciseSets').each(function(i, obj) {
        var set = {};
        set.reps = $(this).find('.exerciseReps').val();
        set.weight = $(this).find('.exerciseWeight').val();
        exercise.sets.push(set);
      });
      session.exercises.push(exercise);
    });
    console.log(session);
    $.ajax({
      url: '/sessions',
      type: 'post',
      dataType: 'json',
      data: session,
      complete: function(data){
        window.location = '/';
      },
    });
  });
});