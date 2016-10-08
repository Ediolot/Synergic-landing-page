
var paperPlane = {
    id:       "paper-plane",
    error_x:   2.1,
    speed_x:   2,
    target_x:  undefined,
    x:         undefined,
    width:     undefined,
    element:   undefined
};

window.onload = function ()
{
    movePaperPlane();

    document.addEventListener("scroll", movePaperPlane);
}

function movePaperPlane()
{
    var scroll      = document.body.scrollTop;
    var plane       = document.getElementById("paper-plane");
    var planeWidth  = document.getElementById("paper-plane").getBBox().width;
    var titleWidth  = document.getElementById("title").offsetWidth;
    var titleHeight = document.getElementById("title").offsetHeight;

    scroll = scroll>titleHeight ? titleHeight : scroll;

    var x = (scroll / titleHeight) * (titleWidth*0.8 - planeWidth);

    plane.style.transform = "translate("+x+"px,0)";
}

// TODO on resize movePaperPlane
