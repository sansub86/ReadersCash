$(document).ready(function() {
    $("#scrolldown").click(function () {
        $('html, body').animate({scrollTop: $(document).height()}, 'slow');
        return false;
    });
    $(".menu-burger").click(function () {
        $(".main-menu").toggleClass("main-menu--hide");
    });
    $(".close").click(function () {
       $(".main-menu").toggleClass("main-menu--hide");
    });
});
