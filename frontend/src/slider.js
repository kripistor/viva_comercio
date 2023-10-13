var indexx = 0;

showw_slide = (i) => {
    indexx += i;

    var imagess = document.getElementsByClassName("block");

    for (i = 0; i < imagess.length; i++)
        imagess[i].style.display = "none";


    if (indexx > imagess.length - 1)
        indexx = 0;

    if (indexx < 0)
        indexx = imagess.length - 1;

    imagess[indexx].style.display = "flex";

}

window.addEventListener("onload", showw_slide(indexx));