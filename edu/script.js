// ciblage du DOM
var app     = document.getElementById("app");
var result  = document.getElementById("result");

// autres globales
var sums    = [];
var NUM_OP  = 10;
var points  = 0;
var LEVEL   = 2; //1: facile, 2: moyen, 3: difficile

function startGame() {
    for(var i=0; i<NUM_OP; i++) {
        createOperation();
    }

    // bouton de correction
    var btnCorrect = document.createElement("button");
    btnCorrect.innerText = "Corriger";
    btnCorrect.addEventListener("click", check);
    app.appendChild(btnCorrect);
}

function createOperation() {
    var operand1 = random(1, 10 ** LEVEL);
    var operand2 = random(1, 10 ** LEVEL);
    var sum = operand1 + operand2;
    sums.push(sum);
    
    var div = document.createElement("div");
    div.innerHTML = 
        '<span>'+ operand1 +'</span> + <span>'+ operand2 +'</span> = ';
    div.innerHTML += '<input class="game" type="text" />';
    div.innerHTML += '<span class="correction"></span>';
    app.appendChild(div);
}

function check() {
    var inputs  = document.querySelectorAll(".game");
    var spans   = document.querySelectorAll(".correction");
  
    for (var i=0; i<NUM_OP; i++) {
        var answer = parseInt(inputs[i].value);
        spans[i].innerText = sums[i];

        if (answer == sums[i]) {
            points++;
            spans[i].style.color = "green";
        } else { // mauvaise réponse
            spans[i].style.color = "red";
        }
    }

    // Affichage du résultat
    result.innerText = points + '/' + NUM_OP;
    points = 0;  // reset
}

// Retourne un entier aléatoire compris entre min et max
function random(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}


startGame();


