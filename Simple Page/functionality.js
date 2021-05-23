
$(document).ready(function(){


    $(".btn-toggle").click(function(){
        if(!$(".navigation-links").hasClass("active"))
        {
            $(".navigation-links").addClass("active");
        }
        else 
        {
            $(".navigation-links").removeClass("active");
        }
    });

    $('.slider-container').slick({
        dots: true
      });


    $('.accordion-btn').click(function(){
        if( $(this).parent().hasClass("active")){
            $('.accordion-tab').removeClass("active");
        }
        else{
            $('.accordion-tab').removeClass("active");
            $(this).parent().addClass("active");
        }
    });





});