
window.onload = function ()
{
    movePaperPlane();

    document.addEventListener("scroll", movePaperPlane);
    window.addEventListener("resize", movePaperPlane);
    document.getElementById("create-acc").addEventListener("click", submitInformation);
}

function movePaperPlane()
{
    var scroll      = getScroll();
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
    const ERROR = 0.2;

    hiddeSingUpImage();
    movePaperPlane();

    var top = document.getElementById("sing-up").getBoundingClientRect().top;

    if (Math.abs(top)>ERROR && incrementScroll(Math.abs(top/35)<1 ? 1 : top/35)>ERROR)
        setTimeout(goToSingUp, 10);
}

function getScroll()
{
    return document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function incrementScroll(value)
{
    var before = getScroll();

    document.documentElement.scrollTop += value;
    document.body.scrollTop += value;

    return Math.abs(before-getScroll());
}

function hiddeSingUpImage()
{
    document.getElementById("sing-up-img").classList.add("hidden");
    document.getElementById("sing-up-form").classList.remove("hidden");
    document.getElementById("create-acc").classList.remove("hidden");
}

function displaySingUpImage()
{
    document.getElementById("sing-up-img").classList.remove("hidden");
    document.getElementById("sing-up-form").classList.add("hidden");
    document.getElementById("create-acc").classList.add("hidden");
}

function submitInformation()
{
    displaySingUpImage();
}
