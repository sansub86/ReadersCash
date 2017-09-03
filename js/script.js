
var screen2_used = 0,
    screen3_used = 0,
    screen4_used = 0,

    el_pos2 = 10000,
    el_pos3 = 10000,
    el_pos4 = 10000;

$(document).ready(function() {
    el_pos2 = $(".screen2").position().top;
    el_pos3 = $(".screen3").position().top;
    el_pos4 = $(".screen4").position().top;

    $("#scrolldown").click(function() {
        $('html, body').animate({
            scrollTop: el_pos2
        }, 'slow');
        return false;
    });
	$(".menu-burger").click(function () {
        $(".main-menu").toggleClass("main-menu--hide");
    });
    $(".close").click(function () {
       $(".main-menu").toggleClass("main-menu--hide");
    });
    //$(".screen1").css("height",$(window).height()-$("#scrolldown").outerHeight(true)-$(".screen1").outerHeight(true)+$(".screen1").outerHeight(false));
});

$(document).scroll(function() {
    var s_top = $("body").scrollTop();
    if ((s_top >= el_pos2) & (screen2_used == 0)) {
        screen2();
    }
    if ((s_top >= el_pos3) & (screen3_used == 0)) {
        screen3();
    }
    if ((s_top >= el_pos4) & (screen4_used == 0)) {
        screen4();
    }
});

function screen2() {
    screen2_used = 1;
    $(".screen2_slider").animate({
        "background-position-y": '+=200'
    }, 800);
    $(".screen2_slider").animate({
        "background-position-y": '+=200'
    }, {
        duration: 800,
        complete: function() {
            var $new_shadow = $("<div></div>").addClass(
                "black-back").appendTo("body"),
			    $new_btn = $("<div></div>").addClass(
                "screen2_slider_btn").appendTo(".screen2"),
				$new_btn_arrow = $("<img></img>").addClass(
                "screen2_slider_arrow").attr("src","img/arrow_left.png").appendTo(".screen2"),
				$link_pos = $(".screen2_slider_btn_link").offset();
				
			//появление кнопки, стрелок, тени	
			$new_btn.fadeIn(10);
			
            $new_shadow.css("top", $(".screen2").position().top);
            $new_shadow.fadeIn(1500);
			
			$new_btn.offset({ top: $link_pos.top, left: $link_pos.left });
            
			$new_btn_arrow.fadeIn(1490);
			//настрою после адаптации к мобильным
			var $arrow_pos = $link_pos.top - 70;
			
			$new_btn_arrow.offset({ top: $arrow_pos, left: $link_pos.left + 90 });
            //конечная анимация появления стрелки и сдвига тени
            var $new_arrow = $("#scrolldown").clone();
            $new_arrow.css({
                "display": "none"
            });
            $new_arrow.insertAfter(".screen2");
            $new_arrow.click(function() {
                $('html, body').animate({
                    scrollTop: el_pos3
                }, 'slow');
                return false;
            });
            $new_arrow.css({
                "margin-top": ($new_arrow.height()) * (-1) -
                    10,
                'z-index': '3',
                'position': 'relative'
            });
            $new_arrow.fadeIn(800);
            $new_shadow.animate({
                "top": $new_arrow.position().top -
                    $new_arrow.height() - 15,
                "height": $new_arrow.height() + 10,
                "opacity": "0.25"
            }, 800);
        }
    });

}

function screen3() {
    screen3_used = 1;

    var $new_shadow = $("<div></div>").addClass("black-back").appendTo("body"),
		$new_btn = $("<div></div>").addClass(
        "screen3_slider_btn").appendTo(".screen3"),
		$new_btn_arrow = $("<img></img>").addClass(
        "screen3_slider_arrow").attr("src","img/arrow_right.png").appendTo(".screen3"),
		$link_pos = $(".screen3_slider_btn_link").offset();

    $new_btn.fadeIn(10);
			
            $new_shadow.css("top", $(".screen3").position().top);
            $new_shadow.fadeIn(1500);
			
			$new_btn.offset({ top: $link_pos.top, left: $link_pos.left });
            
			$new_btn_arrow.fadeIn(1490);
			//настрою после адаптации к мобильным
			var $arrow_pos = $link_pos.top - 70;
			
			$new_btn_arrow.offset({ top: $arrow_pos, left: $link_pos.left - 90 });


    //конечная анимация
    var $new_arrow = $("#scrolldown").clone();
    $new_arrow.css({
        "display": "none"
    });
    $new_arrow.insertAfter(".screen3");
    $new_arrow.click(function() {
        $('html, body').animate({
            scrollTop: el_pos4
        }, 'slow');
        return false;
    });
    $new_arrow.css({
        "margin-top": ($new_arrow.height()) * (-1) - 10,
        'z-index': '3',
        'position': 'relative'
    });
    $new_arrow.fadeIn(800);
    $new_shadow.animate({
        "top": $new_arrow.position().top - $new_arrow.height() - 15,
        "height": $new_arrow.height() + 10,
        "opacity": "0.25"
    }, 800);
}

function screen4() {
    screen4_used = 1;
    
    $(".screen4__text").slideDown("1500");
}