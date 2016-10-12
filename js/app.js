
window.onload = function ()
{
    movePaperPlane();

    setScroll(0);

    document.addEventListener("scroll", movePaperPlane);
    window.addEventListener("resize", movePaperPlane);

    document.getElementById("sing-up-button").addEventListener("click", function () {
        goToSingUp();
        hiddeSingUpImage();
    });

    var form = document.forms["sing-up-form"];
    for (var i=0; i<form.children.length; ++i)
    {
        form.children[i].addEventListener("keydown", validateForm);
        form.children[i].addEventListener("keyup", validateForm);
    }
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
    var ERROR = 2;
    var SPEED = 20;

    movePaperPlane();

    var top = document.getElementById("sing-up").getBoundingClientRect().top;
    var inc = Math.abs(top)<SPEED ? top : SPEED*Math.abs(top)/top;

    if (Math.abs(top)>ERROR && incrementScroll(inc)>ERROR)
        setTimeout(goToSingUp, 10);
}

function getScroll()
{
    return document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function setScroll(value)
{
    document.documentElement.scrollTop = value;
    document.body.scrollTop = value;
}

function incrementScroll(value)
{
    var before = getScroll();
    setScroll(before+value);
    return Math.abs(before-getScroll());
}

function hiddeSingUpImage()
{
    document.getElementById("sing-up-img").classList.add("hidden");
    document.getElementById("sing-up-form").classList.remove("hidden");
    document.getElementById("create-acc").classList.remove("hidden");
}

function validateForm(event)
{
    var NAME_REGEX  = /^[A-Z][a-z']+(\s[A-Z][a-z']+)+$/;
    var EMAIL_REGEX = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    var PASS_REGEX  = /^.{6,18}$/;

    var form = document.forms["sing-up-form"];

    var error_nameEl         = document.getElementById("name-error");
    var error_emailEl        = document.getElementById("email-error");
    var error_passEl         = document.getElementById("pass-error");
    var error_pass_confirmEl = document.getElementById("confirm-pass-error");

    preventMultispacesOn(form["name-text"], event);
    preventSpacesOn(form["email-text"], event);

    var check = [];
    check["name"]         = validateInput(form["name-text"], error_nameEl, NAME_REGEX);
    check["email"]        = validateInput(form["email-text"], error_emailEl, EMAIL_REGEX);
    check["pass"]         = validateInput(form["pass-text"], error_passEl, PASS_REGEX);

    check["pass-confirm"] = form["confirm-pass-text"].value==form["pass-text"].value;
    error_pass_confirmEl.style.visibility = (check["pass-confirm"] || !form["confirm-pass-text"].value) ? "hidden" : "visible";

    return check["name"] && check["email"] && check["pass"] && check["pass-confirm"];
}

function validateInput(textElement, errorElement, regex)
{
    var valid = regex.test(textElement.value) && !!textElement.value;
    errorElement.style.visibility = (valid || !textElement.value) ? "hidden" : "visible";
    return valid;
}

function preventSpacesOn(element, event)
{
    if (element != document.activeElement) return;
    if (event.keyCode==32) event.preventDefault();
}

function preventMultispacesOn(element, event)
{
    if (element != document.activeElement) return;

    var start = element.selectionStart;
    var end   = element.selectionEnd;

    if (event.keyCode==32 && start==end)
    {
        console.log("in");
        if (element.value[start-1] == " ") // Ya hay un espacio antes
            event.preventDefault();

        if (element.value[start] == " ") // Ya hay un espacio después
        {
            element.setSelectionRange(start+1, start+1);
            event.preventDefault();
        }

        if (start == 0) // Espacios al principio
            event.preventDefault();
    }
}
