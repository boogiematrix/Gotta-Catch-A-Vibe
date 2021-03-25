var searchSubmitButtonE1 = $("#searchSubmitButton");
var recentCitySearch1E1 = $("#recentCitySearch1"); // The city blocks displayed in search history 

var searchHistoryArray= [];
var searchHistoryArrayIndex = 0;


searchSubmitButtonE1.on("click", function(event){
    // triggers off of button click
    
    event.preventDefault();
    var citySearchBoxText = document.getElementById("searchInput").value; // Text we want stored. From the search bar
    recentCitySearch1E1.text(citySearchBoxText); // Displays to screen using what was typed into search bar

    localStorage.setItem("searchInputStorage", citySearchBoxText); // like declaring a new variable. 


    searchHistoryPopulate(citySearchBoxText); // passes on the city name
})


function searchHistoryPopulate(cityName) {
    // triggered by search button press 
    searchHistoryArrayIndex += 1;
    console.log("after incrament " + searchHistoryArrayIndex + " | City name is " + cityName);


    searchHistoryListE1 = document.getElementById("searchHistoryList");
    var newHeading = document.createElement("li");
    newHeading.innerText = cityName;
    searchHistoryListE1.appendChild(newHeading);


}





/*      --          local storage          --      */

$("#recentCitySearch1").text(localStorage.getItem("searchInputStorage"));






/* Variable Definition 

. searchSubmitButtonE1 | References search button in HTML
. recentCitySearch1E1  | References text for HTML display 
. 
.
.
.

git push like this below -- 
git push origin localStorage


*/



