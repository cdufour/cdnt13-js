// Ciblage du DOM et globales
var app                     = document.getElementById("app");
var selectCategory          = document.getElementById("selectCategory");
var gallery                 = selectCategory.nextElementSibling;
var details                 = document.getElementById("details");
var detailsMealName         = details.querySelector("h2");
var detailsMealCategory     = details.querySelector("#detailsCategory");
var detailsMealArea         = details.querySelector("#detailsArea");
var detailsTags             = details.querySelector("#detailsTags");
var ytFrame                 = details.querySelector("iframe");
var btnClose                = details.querySelector("button");

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

    btnClose.addEventListener("click", () => {
        details.classList.add("hidden"); // masque les détails
        gallery.style.opacity = 1;
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
    // requête ajax pour obtention des détails
    fetch(API + "lookup.php?i=" + this.id)
        .then(res => res.json())
        .then(res => {
            populateDetails(res.meals[0]);
            details.classList.remove("hidden");
            gallery.style.opacity = 0.2;
        })
}

function populateDetails(meal) {
    detailsMealName.innerText = meal.strMeal;
    detailsMealCategory.innerText = meal.strCategory;
    detailsMealArea.innerText = meal.strArea;

    //https://www.youtube.com/watch?v=3_UAxkx0u6U
    // =>
    //https://www.youtube.com/embed/3_UAxkx0u6U
    ytFrame.src = meal.strYoutube.replace("watch?v=", "embed/");

    // si strTags n'est ni chaîne vide ni null ni undefined
    if (meal.strTags) {
        detailsTags.innerHTML = ""; // reset
        var tags = meal.strTags.split(','); // retourne tableau
        tags.forEach(tag => {
            var span = document.createElement("span");
            span.innerText = tag;
            detailsTags.appendChild(span);
        })
    }
    //detailsTags.innerText = meal.strTags;
}

init();