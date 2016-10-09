
window.onload = function ()
{
    movePaperPlane();

    document.addEventListener("scroll", movePaperPlane);
    window.addEventListener("resize", movePaperPlane);
    document.getElementById("create-acc").addEventListener("click", submitInformation);

    var form = document.getElementById("sing-up-form");
    for (var i=0; i<form.children.length; ++i)
    {
        form.children[i].addEventListener("keyup", checkForm);
        form.children[i].addEventListener("keydown", checkForm);
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


function checkForm()
{
    var NAME_REGEX  = /^[A-Z][a-z']+(\s[A-Z][a-z']+)+$/;
    var EMAIL_REGEX = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    var PASS_REGEX  = /^.{6,18}$/;

    var nameEl       = document.getElementById("name-text");
    var error_nameEl = document.getElementById("name-error");

    var emailEl       = document.getElementById("email-text");
    var error_emailEl = document.getElementById("email-error");

    var passEl       = document.getElementById("pass-text");
    var error_passEl = document.getElementById("pass-error");

    var pass_confirmEl       = document.getElementById("confirm-pass-text");
    var error_pass_confirmEl = document.getElementById("confirm-pass-error");

    var check = [];

    check[0] = checkName(nameEl, error_nameEl, NAME_REGEX)
    check[1] = checkSimple(emailEl, error_emailEl, EMAIL_REGEX)
    check[2] = checkSimple(passEl, error_passEl, PASS_REGEX)
    check[3] = checkPasswordConfirm(passEl, pass_confirmEl, error_pass_confirmEl);

    return (check[0] && check[1] && check[2] && check[3]) && (nameEl.value!="" && emailEl.value!="" && passEl.value!="" && pass_confirmEl.value!="");
}

function checkName(textElement, errorElement, regex)
{
    var start = textElement.selectionStart;
    var end   = textElement.selectionEnd;

    var oldText = textElement.value;
    var newText = textElement.value.replace(/ +/g, " ");
    var valid   = regex.test(newText) || textElement.value=="";

    if (textElement == document.activeElement)
    {
        textElement.value = newText;
        textElement.setSelectionRange(start, oldText!=newText ? end-1 : end);
        errorElement.style.visibility = valid ? "hidden" : "visible";
    }

    return valid;
}

function checkSimple(textElement, errorElement, regex)
{
    var valid = regex.test(textElement.value) || textElement.value=="";
    errorElement.style.visibility = valid ? "hidden" : "visible";
    return valid;
}

function checkPasswordConfirm(textElement_pass, textElement_confirm, errorElement)
{
    var valid = textElement_pass.value==textElement_confirm.value || textElement_confirm.value=="";
    errorElement.style.visibility = valid ? "hidden" : "visible";
    return valid;
}

function submitInformation()
{
    if (!checkForm()) return;

    document.getElementById("sing-up-form").submit();
    console.log(document.getElementById("sing-up-form"));
    //displaySingUpImage();
}
