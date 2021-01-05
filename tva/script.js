// exemple: https://www.service-public.fr/simulateur/calcul/convertisseurPrixHTouTTC

// ciblage du DOM
var txtHt       = document.getElementById("txtHt");
var selectTax   = document.getElementById("selectTax");
var spanTva     = document.getElementById("spanTva");
var spanTtc     = document.getElementById("spanTtc");

// autres globales
var isCommaUsed = false; // virgule déjà saisie ? boolean

// écoute événementielle
selectTax.addEventListener("change", onChange);
txtHt.addEventListener("keyup", onKeyup);

function onChange() {
    //var selectedTax = this.value;
    var selectedTax = selectTax.value;

    if (selectedTax != "" && txtHt.value != "") {
        // calcul de la tva
        // l'opérateur * va entraîner une conversion de la
        // chaîne en valeur numérique
        var tva = txtHt.value.replace(',','.') * (selectedTax / 100);
        var ttc = parseFloat(txtHt.value) + tva;
    
        // mise à jour du DOM
        spanTva.innerText = tva.toFixed(2);
        spanTtc.innerText = ttc.toFixed(2);
    }

}

function onKeyup(event) {
    // retour immédiat en cas de pression de la touche shift
    // la suite du code n'est pas exécutée
    if (event.key == "Shift") return;

    if (event.key == "Backspace") {

        if (txtHt.value.indexOf(",") == -1)
            isCommaUsed = false;

        if (selectTax.value != "") onChange();
        return;
    }

    var k = parseInt(event.key);

    if (k >= 0 && k < 10) {
        //console.log("Valeur numérique saisie")
        onChange();
    } else {
        //console.log("Valeur non numérique saisie")
        if (event.key == ",") {
            //console.log("Virgule saisie");
            if (!isCommaUsed) {
                isCommaUsed = true;
            } else {
                this.value = this.value.substr(0, this.value.length - 1);
            }
        } else {
            this.value = this.value.substr(0, this.value.length - 1);
        }
    }

}