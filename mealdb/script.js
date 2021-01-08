var API = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";

fetch(API)
    .then(res => res.json())
    .then(res => {
        console.log(res);
    })