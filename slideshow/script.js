// ciblage du DOM
var imgCity     = document.getElementById("imgCity");
var cityName    = document.getElementById("cityName");

// autres globales
var images = ["paris", "rio", "rome", "lisbonne"];
var i = 0;
var PERSIST_DURATION = 1000 * 5; // 5 secondes

function animation1() {
    setInterval(function() {
        imgCity.src = 'images/' + images[i] + '.jpg';
        cityName.innerText = capitalize(images[i]);
        i++;
        if (i == images.length) i = 0;
    }, 3000)
}

function animation2() {
    var opacity = 1;
    var interval;
    interval = setInterval(function() {
        opacity -= 0.1; //1 -> 0.9 -> 0.8 -> ...
        imgCity.style.opacity = opacity; // modif css

        // arrêt de l'interval quand l'opacité égale ou inférieure à 0
        if (opacity <= 0) {
            clearInterval(interval);
            imgCity.src = 'images/' + images[i] + '.jpg';
            fadeIn(imgCity, 100);
        } 

    }, 100)
}

function animation3() {
    fadeOut(imgCity, 100);
}

// fonction destinée à faire apparaître 
// progressivement l'image ciblée
function fadeIn(img, speed) {
    var opacity = 0;
    var interval = setInterval(function() {
        opacity += 0.1;
        img.style.opacity = opacity;

        // arrêt
        if (opacity >= 1) {
            clearInterval(interval);
            // peristence de l'image avant disparition
            setTimeout(function() {
                fadeOut(img, speed);
            }, PERSIST_DURATION)
        }

    }, speed)
}

// fonction destinée à faire disparaître 
// progressivement l'image ciblée
function fadeOut(img, speed) {
    var opacity = 1;
    var interval = setInterval(function() {
        opacity -= 0.1;
        img.style.opacity = opacity;

        // arrêt
        if (opacity <= 0) {
            clearInterval(interval);
            imgCity.src = 'images/' + images[i] + '.jpg';
            cityName.innerText = capitalize(images[i]);
            i++;
            if (i == images.length) i = 0;
            fadeIn(imgCity, 100);
        }

    }, speed)
}

animation3();
