// ciblage du DOM
var thumbs = document.getElementById("thumbs");
var thumbsImg = thumbs.children; // images filles
// Autres méthodes de sélection:
//var thumbs = document.querySelector("#thumbs").children
//var thumbs = document.querySelectorAll("section#thumbs img");

var numPers         = document.getElementById("numPers");
var price           = document.getElementById("price");
var selectNumPers   = document.getElementById("selectNumPers");
var btnApply        = document.getElementById("btnApply");

// autres globales
var BASE_PRICE      = 230; // prix de base pour une personne
var VALID_COUPON    = "ROMAVICTOR";
var DISCOUNT        = 40;
var totalPrice      = BASE_PRICE;
var COLORS = { 
    success: "green", 
    failure: "red" 
};

// écoute événementielle
for (var i=0; i<thumbsImg.length; i++) {
    thumbsImg[i].addEventListener("mouseover", function() {
        // la source de l'image survolée devient la source
        // de l'image principale
        var thumbSrc = this.src;
        thumbs.previousElementSibling.src = thumbSrc;
    })
}

selectNumPers.addEventListener("change", function() {
    var n = parseInt(this.value);

    // mise à jour du nombre de voyageurs
    numPers.innerText = n + " personne";
    numPers.innerText += (n>1) ? 's' : '';

    // mise à jour du prix total
    totalPrice = BASE_PRICE * n;
    price.innerText = BASE_PRICE * n + ",00";
})

btnApply.addEventListener("click", function() {
    var inputVal = this.previousElementSibling.value;
    if (inputVal != VALID_COUPON) {
        // équivalent par utilisation de innerHTML:
        /*
        this.nextElementSibling.innerHTML =
            '<span style="color: red">Coupon non valable</span>';
        */
       this.nextElementSibling.innerText = "Coupon non valable";
       this.nextElementSibling.style.color = COLORS.failure; // red
    } else { // coupon valable
        this.nextElementSibling.innerText = "Coupon valable";
        this.nextElementSibling.style.color = COLORS.success; // green
        price.innerText = totalPrice - DISCOUNT + ",00"
    }
})