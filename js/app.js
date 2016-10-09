
window.onload = function ()
{
    movePaperPlane();

    document.addEventListener("scroll", movePaperPlane);
    window.addEventListener("resize", movePaperPlane);
    document.getElementById("create-acc").addEventListener("click", submitInformation);
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
    // TODO speed up this
    document.getElementById("sing-up-img").classList.add("hidden");
    document.getElementById("sing-up-form").classList.remove("hidden");
    document.getElementById("create-acc").classList.remove("hidden");

    document.getElementById("sing-up").style.display = "inline-block";
    var top = document.getElementById("sing-up").getBoundingClientRect().top;
    movePaperPlane();

    if (top!=0)
    {
        var before = document.body.scrollTop;
        document.body.scrollTop += Math.abs(top/35)<1 ? 1 : top/35;
        if (before != document.body.scrollTop)
            setTimeout(goToSingUp, 10);
    }
    else
         window.location.hash = "sing-up";
}

function submitInformation()
{
    document.getElementById("sing-up-form").classList.add("hidden");
    document.getElementById("create-acc").classList.add("hidden");
    document.getElementById("sing-up-img").classList.remove("hidden");
}
