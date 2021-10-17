// setInterval(function(){
            
//     var $icon=$('#mainicon');
//     $icon.toggleClass('fa-rotate-180'); 
// },700);

function rotateLetter(d){
    $l=$("#mainLetter");
    $l.css({
        'transform':'rotate('+d+'deg)'
    });
}


function animateRotate(angle,id) {
    // caching the object for performance reasons
    var $elem = $(id);

    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    $({deg: 0}).animate({deg: angle}, {
        duration: 3000,
        step: function(now) {
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}

window.setInterval(function(){animateRotate(360,"#mainLetter");},3000);
// animateRotate(360);
window.setInterval(function(){animateRotate(-360,"#fourthLetter");},6000);
window.setInterval(function(){animateRotate(360,"#seventhLetter");},9000);

$(function(){
    $(document).scroll(function(){
        var $nav=$('#mainnavbar');
        $nav.toggleClass("scrolled",$(this).scrollTop()>$nav.height());

    })

})