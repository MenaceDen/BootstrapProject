$(document).ready(function () {
  loadCourses();
  document.getElementById("forma").addEventListener("submit", function (event) {
    event.preventDefault();
    //manageEmployee(event);
  });
});
function loadCourses() {
  let getCourses = $.ajax({
    type: "GET",
    url: "http://localhost:3000/courses",
  });
  getCourses.done(function (data) {
    $("#courses-table tbody").empty();
    $.each(data, function (i, element) {
      $("#courses-table tbody").append(
        `<tr><td>${element.name}</td><td>${element.date}</td><td>${element.duration}</td><td>${element.price}</td><td><button id="${element.id}_details" class="btn course-btn border-success" onclick="showDetails(${element.id})">View Details</button></td><td><button id="${element.id}_reservation" class="btn course-btn border-success" onclick="makeReservation(${element.id}, event)">Make reservation</button></td></tr>`
      );
    });
    $("#courses-table th").css({
      "background-color": "var(--courses-background-color)",
      "border-color": "var(--courses-background-color)",
    });
    $("#courses-table").dataTable();
  });
  getCourses.fail(function (err) {
    alert(err.statusText);
  });
}
function showDetails(id) {
  var detailsModal = new bootstrap.Modal(document.getElementById("modal1"), {
    keyboard: false,
  });
  let modalData = $.get(`http://localhost:3000/courses/${id}`, function (data) {
    $("#course_modal_name").text(data.name);
    $("#course_modal_text").html(`${data.details} <br> ${data.price}$`);
  });
  detailsModal.show();
}
function makeReservation(id, event) {
  var inputModal = new bootstrap.Modal(document.getElementById("modal2"), {
    keyboard: false,
  });
  let preloadData = $.get(
    `http://localhost:3000/courses/${id}`,
    function (data) {
      $("#name").val(data.name);
      $("#price").val(`${data.price}$`);
    }
  );
  inputModal.show();
}
function closeModal() {
  $("#modal2").modal("toggle");
}
