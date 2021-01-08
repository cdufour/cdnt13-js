// Ciblage du DOM et globales
var app                 = document.getElementById("app");
var selectCategory      = document.getElementById("selectCategory");
var gallery             = selectCategory.nextElementSibling;

var API = "https://www.themealdb.com/api/json/v1/1/";


function init() {
    fetch(API + "filter.php?c=Seafood")
    .then(res => res.json())
    .then(res => {
        buildDom(res.meals);
    })

    selectCategory.addEventListener("change", (e) => {
        // attention: dans le cas d'une function fléchée "this" ,'est pas relié
        // à l'élément du DOM ayant déclenché l'événement
        // solution: utiliser le paramètre e, et e.target pour cibler cet élément
        var selectedCategory = e.target.value;
        if (selectedCategory != "") {
            fetch(API + "filter.php?c=" + selectedCategory)
                .then(res => res.json())
                .then(res => {
                    buildDom(res.meals);
                })
        } else { // pas de choix
            gallery.innerHTML = "";
        }
    })
}

function buildDom(meals) {
    gallery.innerHTML = ""; // reset
    meals.forEach(meal => {
        var img = document.createElement("img");
        img.src = meal.strMealThumb;
        img.alt = meal.strMeal;
        img.id  = meal.idMeal;
        img.classList.add("thumb");
        img.addEventListener("click", mealDetails)
        gallery.appendChild(img);
    })
}

function mealDetails() {
    console.log(this.id)
}

init();