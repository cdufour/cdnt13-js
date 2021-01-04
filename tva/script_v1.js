// ciblage du DOM
var txtHt       = document.getElementById("txtHt");
var selectTax   = document.getElementById("selectTax");
var spanTva     = document.getElementById("spanTva");
var spanTtc     = document.getElementById("spanTtc");

// écoute événementielle
selectTax.addEventListener("change", onChange);
txtHt.addEventListener("keyup", onKeyup);

function onChange() {
    //var selectedTax = this.value;
    var selectedTax = selectTax.value;
    var tva = txtHt.value * (selectedTax / 100);
    var ttc = parseInt(txtHt.value) + tva;

    // mise à jour du DOM
    spanTva.innerText = tva;
    spanTtc.innerText = ttc;
}

function onKeyup(event) {
    //console.log(event.key)

    // retour immédiat en cas de pression de la touche shift
    // la suite du code n'est pas exécutée
    if (event.key == "Shift") return;

    if (event.key == "Backspace") {
        if (selectTax.value != "") {
            onChange();
            return;
        }
    }

    var k = parseInt(event.key);
    if(isNaN(k)) {
        // on efface la dernière saisie si 
        // le caractère n'est pas numérique
        this.value = this.value.substr(0, this.value.length - 1);
    } else {
        // A priori, le caractère saisi est numérique

        // l'utilisateur a sélectionné un taux
        if (selectTax.value != "") {
            onChange();
        }

    }
 
}