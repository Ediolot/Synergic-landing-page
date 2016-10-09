
window.onload = function ()
{
    movePaperPlane();

    document.addEventListener("scroll", movePaperPlane);
    window.addEventListener("resize", movePaperPlane);
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

function goToSingUp()
{
    var top = document.getElementById("sing-up").getBoundingClientRect().top;
    movePaperPlane();

    if (top!=0)
    {
        document.body.scrollTop += Math.abs(top/35)<1 ? 1 : top/35;
        setTimeout(goToSingUp, 10);
    }
    else
    {
         window.location.hash = "sing-up";
    }
}
