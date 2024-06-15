$(document).ready(function () {
  loadCourses();
  $("#reservations_table_container").toggle();

  document.getElementById("forma").addEventListener("submit", function (event) {
    event.preventDefault();
    manageReservations(event);
  });
});
let btnText = "View Reservations";

$("#btn_toggle").text(btnText);
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
function manageReservations(event) {
  let formData = new FormData(event.target);
  //let jsonToSend = convertToJson(event.target);
  //if ($("#forma").valid()) {
  if (event.target) {
    let reservation = Object.fromEntries(formData);
    let isEdit = reservation.id;
    if (isEdit) {
      $.ajax({
        url: "http://localhost:3000/reservations/" + reservation.id,
        type: "PUT",
        dataType: "json",
        data: JSON.stringify(reservation),
        success: function (data) {
          loadReservations();
          $("#modal2").modal("toggle");
        },
        error: function () {
          alert("Neuspelo editovanje");
        },
      });
    } else {
      $.ajax({
        url: "http://localhost:3000/reservations",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(reservation),
        success: function (element) {
          loadCourses();
          $("#modalUnos").modal("toggle");
        },
        error: function () {
          alert("Neuspelo dodavanje");
        },
      });
    }
  } else {
    alert("Popuni formu pravilno");
  }
}
function loadReservations() {
  let getRequest = $.ajax({
    type: "GET",
    url: "http://localhost:3000/reservations",
  });

  getRequest.done(function (data) {
    $("#employee-table tbody").empty();
    let prices = [];
    $.each(data, function (i, element) {
      prices.push(element.price);
      $("#reservations-table tbody").append(`<tr>
        <td>${element.name}</td>
        <td>${element.surname}</td>
        <td>${element.email}</td>
        <td>${element.courseName}</td>
        <td>${element.price}</td>
        <td>${element.comment}</td>
        <td>
            <button id="${element.id}_edit" class="btn btn-warning" onclick="editEmployee(${element.id}, event)">Izmena</button>
        </td>
        <td>
            <button id="${element.id}_delete" class="btn btn-danger" onclick="deleteEmployee(${element.id}, event)">Obrisi</button>
        </td>
        </tr>`);
    });
    let pricesSum = prices.reduce(function (total, num) {
      return parseInt(total) + parseInt(num);
    });
    $("#calculation").text(`${pricesSum}$`);
  });

  getRequest.fail(function (err) {
    alert(err.statusText);
  });
}
function toggleTables() {
  loadReservations();
  if (btnText === "View Reservations") {
    btnText = "Back to Courses";
  } else {
    btnText = "View Reservations";
  }
  $("#btn_toggle").text(btnText);
  $("#main_table_container").toggle();
  $("#reservations_table_container").toggle();
}
function closeModal() {
  $("#modal2").modal("toggle");
}
