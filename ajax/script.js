console.log(1);

/*
var promise = fetch("file.txt");

promise.then((res) => {
    //console.log(res.status)
    return res.text(); // retourne une promise
}).then((content) => {
    console.log(content)
})
*/

//setInterval(() => demo(), 5000);




function demo() {
    fetch("file.txt")
    .then(res => res.text())
    .then(res => {
        var p = document.createElement("p");
        p.innerText = res;
        document.body.appendChild(p);
    });
}

function demoJson() {
    fetch("teams.json")
        .then(res => res.json())
        .then(teams => {
            buildSelectMenu(teams);
            buildList(teams);
        })
}

function buildSelectMenu(teams) {
    var select = document.createElement("select");
    teams.forEach(team => {
        var option = document.createElement("option");
        option.innerText = team.name;
        option.value = team.id;
        select.appendChild(option);
    })
    document.body.appendChild(select);
}

function buildList(teams) {
    var list = document.createElement("ul");

    for (var i=0; i<teams.length; i++) {
        var item = document.createElement("li");
        //item.innerText = teams[i].name + ' (' + teams[i].scudetti + ')';
        // Syntaxe alternative ES6:
        item.innerText = `${teams[i].name} (${teams[i].scudetti})`;
        list.appendChild(item);
    }

    document.body.appendChild(list);
}


console.log(3)

demoJson();