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

  $(document).on("click", ".message-options",
    function() {
      $(this).siblings(".message-actions").toggle();
    }
  );

  $(document).on("click", ".message-actions",
    function() {
      $(this).parents(".message-row").remove();
    }
  );

  $(".contact").click(
    function() {
      $(".contact").removeClass("active");
      $(this).addClass("active");

      var dataContatto = $(this).attr("data-contatto");

      $(".chat").removeClass("active");
      $(".chat[data-conversazione="+dataContatto+"]").addClass("active");

      var img = $(this).find("img").attr("src");
      var name = $(this).find(".contact-name").text();
      var time = $(this).find(".contact-time").text();

      $(".col-right .avatar-img img").attr("src", img);
      $(".col-right .avatar-name").text(name);
      $(".col-right .avatar-last-access time").text(time);
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

    $(".chat.active").append(templateMessage);
    setTimeout(cpuMessage, 1000);
    $("#input-message").val("");
    var heightChatActive = $(".chat.active").prop("scrollHeight");
    $(".chats-wrapper").scrollTop(heightChatActive);
  }
}

function cpuMessage() {
  var cpuMessage = $(".templates .message-row").clone();

  cpuMessage.find(".message-text").text("Ok");
  var time = getTime();
  cpuMessage.find(".message-time").text(time);

  $(".chat.active").append(cpuMessage);
  var heightChatActive = $(".chat.active").prop("scrollHeight");
  $(".chats-wrapper").scrollTop(heightChatActive);
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
