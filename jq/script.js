// ciblage du DOM et globales
var search = $("#app input");
var ulCountries = $("#countries");
var countries = [
    "Allemagne", "Andorre", "Belgique", "Belarus", "France", "Italie"
];
var countriesFiltered = null;

search.keyup(() => {
    var searchedValue = search.val();
    if (searchedValue.length > 1) {
        countriesFiltered = countries.filter(country => 
            country.toLowerCase().indexOf(
                searchedValue.toLowerCase()) != -1);
        buildDom();
    } else {
        ulCountries.html(""); // reset
    }
})

function buildDom() {
    ulCountries.html(""); // reset
    countriesFiltered.forEach(country => {
        var li = $("<li>"+ country +"</li>");
        //li.text(country);
        ulCountries.append(li);
    })
}