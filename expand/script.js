// ciblage du DOM
var titles      = document.getElementsByTagName("h2");
var btnShow     = document.getElementById("btnShow");
var articles    = document.getElementsByTagName("article");

// écoute événementielle
for (var i=0; i<titles.length; i++) {
    // on masque les articles suivant les titres
    titles[i].nextElementSibling.style.display = 'none';

    titles[i].addEventListener("click", function() {
        var display = this.nextElementSibling.style.display;
        // if (display == 'none') {
        //     this.nextElementSibling.style.display = 'block';
        // } else {
        //     this.nextElementSibling.style.display = 'none';
        // }

        // équivalent syntaxique (opérateur ternaire)
        this.nextElementSibling.style.display = 
            (display == 'none') ? 'block' : 'none';

    })
}

btnShow.addEventListener("click", showArticles);

function showArticles() {
    var displayValue;

    if (this.innerText.charAt(0) == 'M') {
        this.innerText = "Afficher tout";
        displayValue = 'none';
    } else {
        this.innerText = "Masquer tout";
        displayValue = 'block';
    }
    
    for (var i=0; i<articles.length; i++) {
        articles[i].style.display = displayValue;
    }
}