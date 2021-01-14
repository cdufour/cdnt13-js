// TP Bet
var app             = document.getElementById("app");
var popular         = app.querySelector("#popular");
var basket          = app.querySelector("#basket");
var bets            = null;
var selectedBets    = [];

function init() {
    fetch("bet.json").then(res => res.json())
        .then(res => {
            bets = res;
            buildDom(bets);
        })
}

function buildDom(bets) {
    bets.forEach((bet, betIndex) => {
        var div = document.createElement("div");
        div.classList.add("bet");

        var innerDiv = document.createElement("div");
        innerDiv.classList.add("poster");
        innerDiv.style.backgroundImage = 
            "url('images/" + bet.poster + "')";

        var info = document.createElement("p");
        info.classList.add("info");
        var date = bet.date.split('T');
        info.innerText = 
            date[0] + ' ' + date[1] + ' ' + bet.country + ' ' + bet.competition;
        
        var game = document.createElement("p");
        game.innerText = bet.team1 + ' - ' + bet.team2;

        div.appendChild(innerDiv);
        div.appendChild(info);
        div.appendChild(game);

        bet.odds.forEach((o, oddsIndex) => {
            var btn = document.createElement("button");
            btn.innerText = o;
            btn.addEventListener("click", (e) => {
                addToBasket(betIndex, oddsIndex);
                setClass(e.target.parentNode, oddsIndex);
            });
            div.appendChild(btn);
        })

        popular.appendChild(div);
    })
    
}

function setClass(domRef, oddsIndex) {
    domRef.querySelectorAll("button")
        .forEach((btn, i) => {
            if (i === oddsIndex) {
                btn.classList.toggle("choice");
            } else {
                btn.classList.remove("choice");
            }
        })
}

function addToBasket(betIndex, oddsIndex) {
    if (selectedBets.length === 0) {
        var domRef = createChoice(betIndex, oddsIndex);
        selectedBets.push({betIndex, oddsIndex, domRef})
    } else {
        var bet = selectedBets.find(
                item => item.betIndex === betIndex);
        if (bet) {
            if (bet.oddsIndex !== oddsIndex) {
                updateChoice(bet.domRef, betIndex, oddsIndex);
            } else {
                removeChoice(betIndex, false);
            }
        } else {
            var domRef = createChoice(betIndex, oddsIndex);
            selectedBets.push({betIndex, oddsIndex, domRef})
        }
    }
    
}

function createChoice(betIndex, oddsIndex) {
    var bet     = bets[betIndex];
    var div     = document.createElement("div");
    var close   = document.createElement("button");
    var p1      = document.createElement("p");
    var p2      = document.createElement("p");
    var sp1     = document.createElement("span");
    var sp2     = document.createElement("span");
    var stake   = document.createElement("input");
    var odds    = bet.odds[oddsIndex];

    div.classList.add("selected");
    close.innerText = 'X';
    close.addEventListener("click", () => {
        removeChoice(betIndex, true);
    })
    p1.innerText = bet.team1 + ' - ' + bet.team2;
    p1.classList.add('game');
    p2.innerText = getPronoStr(oddsIndex, bet);
    p2.classList.add('prono');
    sp1.innerText = 'Cote: ' + odds;
    sp1.classList.add('odds');
    stake.type = "text";
    stake.placeholder = "Mise";
    stake.addEventListener("keyup", (e) => {
        computeGain(betIndex, e.target.value, stake.nextElementSibling);
    });
    sp2.innerText = 'Gains: ';
    sp2.classList.add('gain');

    div.appendChild(close);
    sp2.appendChild(stake);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(sp1);
    div.appendChild(stake);
    div.appendChild(sp2);

    basket.appendChild(div);
    return div;
}

function computeGain(betIndex, stake, targetElem) {
    if (!stake) {
        targetElem.innerText = '-';
        return;
    } 
    var bet = selectedBets.filter(
        item => item.betIndex === betIndex)[0];
    var odds = bets[betIndex].odds[bet.oddsIndex];
    var gain = parseFloat(stake) * parseFloat(odds);
    targetElem.innerText = 'Gains: ' + gain.toFixed(2) + ' €';
}

function getPronoStr(oddsIndex, bet) {
    var prono;

    if (oddsIndex === 0) {
        prono = bet.team1;
    } else if (oddsIndex === 1) {
        prono = "Nul";
    } else {
        prono = bet.team2;
    }
    return 'Résultat du match : ' + prono;
}

function removeChoice(betIndex, fromCloseBtn) {
    var selectedBetIndex;
    var bet;
    selectedBets.forEach((item, i) => {
        if (item.betIndex === betIndex) {
            selectedBetIndex = i;
            bet = item;
            return;
        }
    })
    bet.domRef.remove();
    selectedBets.splice(selectedBetIndex, 1);

    if (fromCloseBtn) {
        var btnOdds = popular.children[betIndex]
            .querySelectorAll("button")[bet.oddsIndex];
        btnOdds.classList.remove("choice");
    }

}

function updateChoice(domRef, betIndex, oddsIndex) {

    var stake   = domRef.querySelector("input").value;
    var odds    = bets[betIndex].odds[oddsIndex];
    var gain;
   
    domRef.querySelector('.prono').innerText = 
        getPronoStr(oddsIndex, bets[betIndex]);

    domRef.querySelector('.odds').innerText = 
        'Cote: ' + odds;

    if (stake) {
        gain = (parseFloat(odds) * parseFloat(stake)).toFixed(2) + ' €';
    } else {
        gain = '-';
    }

    domRef.querySelector('.gain').innerText = gain;
 
    var selectedBetIndex;
    selectedBets.forEach((item, i) => {
        if (item.betIndex === betIndex) {
            selectedBetIndex = i;
            return;
        }
    })
    selectedBets[selectedBetIndex].oddsIndex = oddsIndex;
}

init();

