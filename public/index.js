$(document).ready(function() {
  $("#newSession").click(function() {
    var workoutID = $("#workoutDropdown").val();
    window.location = "/workouts/" + workoutID;
  });
});