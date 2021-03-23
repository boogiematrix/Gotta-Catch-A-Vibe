var searchSubmitButtonE1 = $("#searchSubmitButton");
var recentCitySearch1E1 = $("#recentCitySearch1"); // The city blocks displayed in search history 





searchSubmitButtonE1.on("click", function(event){
    event.preventDefault();


    var citySearchBoxText = document.getElementById("searchInput").value; // Text we want stored. From the search bar
    recentCitySearch1E1.text(citySearchBoxText); // Displays to screen using what was typed into search bar


    localStorage.setItem("searchInputStorage", citySearchBoxText); //like declaring a new variable. The set Item always sa
 // localStorage.setItem(what you're storing to, what you are actually storing)

})


$("#recentCitySearch1").text(localStorage.getItem("searchInputStorage"));




/* Variable Definition 

. searchSubmitButtonE1 | References search button in HTML
. recentCitySearch1E1  | References text for HTML display 
. citySearchBoxText    | References what was typed into the search bar
.
. citySearchBoxSave    | Changes recentCitySearch1E1 to whatever was typed in for citySearchBoxText 
.



*/



