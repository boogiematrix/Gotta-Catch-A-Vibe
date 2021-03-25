var searchSubmitButtonE1 = $("#searchSubmitButton");
var recentCitySearch1E1 = $("#recentCitySearch1"); // The city blocks displayed in search history 

var searchHistoryArray= [];
var searchHistoryArrayIndex = 0;


searchSubmitButtonE1.on("click", function(event){
    // triggers off of button click
    
    event.preventDefault();
    var citySearchBoxText = document.getElementById("searchInput").value; // Text we want stored. From the search bar
    recentCitySearch1E1.text(citySearchBoxText); // Displays to screen using what was typed into search bar

    searchHistoryPopulate(citySearchBoxText); // passes on the city name
})


function searchHistoryPopulate(cityName) {
    // triggered by search button press 
    
    searchHistoryArrayIndex += 1; // incriments index per push 
    searchHistoryArray.push(cityName); // adds last city name to this array

    
    // displays to screen 
    var searchHistoryListE1 = document.getElementById("searchHistoryList");
    var newHeading = document.createElement("li");
    
    var idTag = "searchInput" + searchHistoryArrayIndex;
        //var idTag = "searchInput" + searchHistoryArrayIndex;
    
    newHeading.setAttribute("id", idTag);
    newHeading.innerText = cityName;
    searchHistoryListE1.appendChild(newHeading);

    // sets to local storage
    var storageLocal = "searchInputStorage" + searchHistoryArrayIndex;
        // var storageLocal = "searchInputStorage" + searchHistoryArrayIndex;
    localStorage.setItem(storageLocal, cityName); // like declaring a new variable. 
    localStorage.setItem("searchInputStorage", cityName); // for the first text under search history 1

    // debugging 
    console.log(searchHistoryArray);
    console.log("-- idTag & index " + idTag + " | getElement result " + newHeading.getAttribute("id"));
    console.log("the storageLocal " + storageLocal);
}


$("#recentCitySearch1").text(localStorage.getItem("searchInputStorage"));



/*      --          local storage          --      */


// original 
//localStorage.setItem("searchInputStorage", cityName); // like declaring a new variable.
//$("#recentCitySearch1").text(localStorage.getItem("searchInputStorage"));

//$(idTag).text(localStorage.getItem(storageLocal));
//$(HTMLreference ID).text(localStorage.getItem(where it was stored))





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



