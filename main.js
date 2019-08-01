$(document).ready(function () {

  //setto la lingua di moment in italiano
  moment.locale("it");

  //il mese di default è Gennaio
  var defaultMonth = 0;

  //conservo il mese in cui mi trovo attualmente
  var currentMonth = defaultMonth;

  //url API
  var APIFestivita = "https://flynn.boolean.careers/exercises/api/holidays";

  //template dei giorni
  var hDaysHTML = $("#day-template").html();
  var hDaysTemplate = Handlebars.compile(hDaysHTML);
  var context;

  var festivita;

  populateList(defaultMonth);

  //funzione per popolare il calendario in base al mese (0-11)
  function populateList(month) {

    //aggiungo +1 al mese, perché la API è in base 0
    var gregorianMonth = month + 1

    var yearMonth = "2018-" + gregorianMonth;

    $("#month-label").text(moment(yearMonth).format("MMMM YYYY"));

    for (var i = 1; i <= moment(yearMonth).daysInMonth(); i++) {


      context = {
        day: moment(yearMonth + "-" + i).format("dddd D"),//la data da stampare a schermo,
        data: moment(yearMonth + "-" + i).format("YYYY[-]MM[-]DD")//la proprietà data-calendario
      }

      //nascondo la lista per motivi estetici, prima  di mostrare le festivita
      $("#days-list").hide();

      //inserisco i giorni in lista
      $("#days-list").append(hDaysTemplate(context));

    }

    //chiamo la api per segnare i giorni festivi
    $.ajax({
      url: APIFestivita,
      data: {"year": "2018", "month": month},
      method: "GET",
      success: function (data) {

        if (data.success) {

          festivita = data.response;
          markTheDates(festivita);


          $("#days-list").show();
        }

      },
      error: function (err) {
        console.log(err);
      }

    })
  }



  //funzione per segnare i giorni festivi
  function markTheDates(arr) {
    if (arr) {
      for (var i = 0; i < arr.length; i++) {

        var day = $(".day[data-calendario=" + arr[i].date + "]");

        day.addClass("red");
        var calendarDay = day.text();
        calendarDay += " " + arr[i].name;
        day.text(calendarDay);

        /* $(".day").each(function () {

          if ($(this).attr("data-calendario") === arr[i].date) {
            //segno il giorno in rosso
            $(this).addClass("red");

            //aggiungo il nome della festività
            var calendarDay = $(this).text();
            calendarDay += " " + arr[i].name;
            $(this).text(calendarDay);
          }

        }); */
      }
    }

  }



  $("#next").on("click", function () {

    if (currentMonth < 11) {
      currentMonth++;

      $("#days-list").empty();

      populateList(currentMonth);

    }


  });

  $("#prev").on("click", function () {

    if (currentMonth > 0) {
      currentMonth--;

      $("#days-list").empty();

      populateList(currentMonth);

    }

  });












});