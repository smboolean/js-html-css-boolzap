$(document).ready(function() {

  $(".send-message").click(
    function() {
      sendMessage();
    }
  );

  $("#input-message").keyup(
    function(event) {
      if(event.which == 13) {
        sendMessage();
      }
    }
  );

  $("#search").keyup(
    function() {

      var searchInput = $(this).val();
      searchInput = searchInput.toLowerCase();

      var contactsName = $(".contact .contact-name");

      contactsName.each(function() {
        var name = $(this).text();
        name = name.toLowerCase();

        if(name.includes(searchInput) == true) {
          $(this).parents(".contact").show();
        } else {
          $(this).parents(".contact").hide();
        }
      });

    }
  );

});

function sendMessage() {
  var inputText = $("#input-message").val();

  if(inputText != "") {
    var templateMessage = $(".templates .message-row").clone();

    var time = getTime();

    templateMessage.find(".message-text").text(inputText);
    templateMessage.find(".message-time").text(time);
    templateMessage.addClass("sent");

    $(".chat").append(templateMessage);
    setTimeout(cpuMessage, 1000);
    $("#input-message").val("");
  }
}

function cpuMessage() {
  var cpuMessage = $(".templates .message-row").clone();

  cpuMessage.find(".message-text").text("Ok");
  var time = getTime();
  cpuMessage.find(".message-time").text(time);

  $(".chat").append(cpuMessage);
}

function getTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  if(minutes < 10) {
    minutes = "0" + minutes;
  }

  return hours + ":" + minutes;
}
