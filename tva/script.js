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
        // ToDo: remplacer virgule par point pour calcul
        var tva = txtHt.value * (selectedTax / 100);
        var ttc = parseFloat(txtHt.value) + tva;
    
        // mise à jour du DOM
        spanTva.innerText = tva;
        spanTtc.innerText = ttc;
    }

}

function onKeyup(event) {
    //console.log(event.key)

    // retour immédiat en cas de pression de la touche shift
    // la suite du code n'est pas exécutée
    if (event.key == "Shift") return;

    if (event.key == "Backspace") {

        if (txtHt.value.indexOf(",") == -1)
            isCommaUsed = false;

        if (selectTax.value != "") {
            onChange();
        }
        return;
    }

    var k = parseInt(event.key);

    if (k >= 0 && k < 10) {
        console.log("Valeur numérique saisie")
    } else {
        console.log("Valeur non numérique saisie")
        if (event.key == ",") {
            console.log("Virgule saisie");
            if (!isCommaUsed) {
                isCommaUsed = true;
            } else {
                this.value = 
                    this.value.substr(0, this.value.length - 1);
            }
        } else {
            this.value = 
                this.value.substr(0, this.value.length - 1);
        }
    }


    /*
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
    */
 
}