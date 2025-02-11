jQuery(document).ready(function($) {
  var time = 380;
  setTimeout(function() {
    $("h1.responsive-headline").fitText(1, { minFontSize: "40px", maxFontSize: "90px" });

    $(".smoothscroll").on("click", function(e) {
      e.preventDefault();
      var target = this.hash,
        $target = $(target);

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top
          },
          800,
          "swing",
          function() {
            window.location.hash = target;
          }
        );
    });

    var sections = $("section");
    var navigation_links = $("#nav-wrap a");
    console.log(sections)
    sections.waypoint({
      handler: function(event, direction) {
        var active_section;

        active_section = $(this);
        if (direction === "up") active_section = active_section.prev();

        console.log(active_section.attr("id"));

        var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

        navigation_links.parent().removeClass("current");
        active_link.parent().addClass("current");
      },
      offset: "35%"
    });

    $("header").css({ height: $(window).height() });
    $(window).on("resize", function() {
      $("header").css({ height: $(window).height() });
      $("body").css({ width: $(window).width() });
    });

    $(window).on("scroll", function() {
      var h = $("header").height();
      var y = $(window).scrollTop();
      var nav = $("#nav-wrap");

      if (y > h * 0.2 && y < h && $(window).outerWidth() > 768) {
        nav.fadeOut("fast");
      } else {
        if (y < h * 0.2) {
          nav.removeClass("opaque").fadeIn("fast");
        } else {
          nav.addClass("opaque").fadeIn("fast");
        }
      }
    });

    $(".flexslider").flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: "slide",
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false
    });

    $("form#contactForm button.submit").click(function(e) {

      $("#image-loader").fadeIn();

      var contactName = $("#contactForm #contactName").val();
      var contactEmail = $("#contactForm #contactEmail").val();
      var contactNumber = $("#contactForm #contactNumber").val();
      var contactSubject = $("#contactForm #contactSubject").val();
      var contactMessage = $("#contactForm #contactMessage").val();

      var data =
        "contactName=" +
        contactName +
        "&contactEmail=" +
        contactEmail +
        "&contactSubject=" +
        contactSubject +
        "&contactMessage=" +
        contactMessage;

      var contact_json = {
        "name":contactName,
        "email":contactEmail,
        "phone_number":contactNumber,
        "message": "Subject " + contactSubject + " Message" + contactMessage,
      }

      $.ajax({
        type: "POST",
        url: "https://c816-165-49-68-175.ngrok-free.app/api/contact/",
        data: JSON.stringify(contact_json),
        contentType: "application/json",
        error: function(msg) {
          var error_message = "Name, Email and Phone_number cannot be blank and please make sure the email is valid"

          var email_valid = true;
          if(msg["email"]){
            if(msg.email == "Enter a valid email address." || msg.email == "This field may not be blank."){
              email_valid = false
              error_message += ""
            }
          }

          var name_valid = true;
          if(msg["name"]){
            if(msg.name == "This field may not be blank."){
              name_valid = false
            }
          }

          var phone_number_valid = true;
          if(msg["phone_number"]){
            if(msg.phone_number == "This field may not be blank."){
              phone_number_valid = false
            }
          }
          $("#image-loader").fadeOut();
          $("#message-warning").html(error_message);
          $("#message-warning").fadeIn();
        },
        success: function(msg) {

          $("#image-loader").fadeOut();
          $("#message-warning").hide();
          $("#contactForm").fadeOut();
          $("#message-success").fadeIn();

        }
      });
      return false;
    });
  }, time);
});
