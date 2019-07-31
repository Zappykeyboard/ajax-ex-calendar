$(document).ready(function () {
  moment.locale("it");

  //il mese di default è Gennaio
  var defaultMonth = 0;

  //url API
  var APIFestivita = "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=";

  //template dei giorni
  var hDaysHTML = $("#day-template").html();
  var hDaysTemplate = Handlebars.compile(hDaysHTML);
  var context;

  var festivita;


  for (var i = 1; i <= moment("2018-01").daysInMonth(); i++) {

    //console.log(moment("2018-01-"+i).format("dddd D MMMM"));
    context = {
      day: moment("2018-01-" + i).format("dddd D"),
      data: moment("2018-01-" + i).format("YYYY[-]MM[-]DD")
    }

    $("#days-list").append(hDaysTemplate(context));

  }


  $.ajax({
    url: APIFestivita += 0,
    method: "GET",
    success: function (data) {

      if (data.success) {

        festivita = data.response;
        markTheDates(festivita);
      }

    },
    error: function (err) {
      console.log(err);
    }



  })

  function markTheDates(arr) {
    
    if (arr) {
        
      for (var i = 0; i < arr.length; i++) {
        

        $(".day").each(function () {
          //console.log($(this).attr("data-calendario"), arr[i].date )

          if ($(this).attr("data-calendario") === arr[i].date){
            console.log(true)
            $(this).addClass("red");
            var calendarDay = $(this).text();
            calendarDay += " " + arr[i].name;
            $(this).text(calendarDay);
          }

    });
      }
    }

  }
















});