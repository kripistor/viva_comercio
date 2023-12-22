var indexxx = 0;

showww_slide = (i) => {
    indexxx += i;

    var images = document.getElementsByClassName("blockk");

    for (i = 0; i < images.length; i++)
        images[i].style.display = "none";


    if (indexxx > images.length - 1)
        indexxx = 0;

    if (indexxx < 0)
        indexxx = images.length - 1;

    images[indexxx].style.display = "flex";

}

window.addEventListener("onload", showww_slide(indexxx));