var searchSubmitButtonE1 = $("#searchSubmitButton");

var recentCitySearch1E1 = $("#recentCitySearch1"); // The city blocks displayed in search history 
var recentCitySearch2E1 = $("#recentCitySearch2");
var recentCitySearch3E1 = $("#recentCitySearch3");
var recentCitySearch4E1 = $("#recentCitySearch4");
var recentCitySearch5E1 = $("#recentCitySearch5");
var recentCitySearch6E1 = $("#recentCitySearch6");


var searchHistoryArray = [];
var searchHistoryArrayIndex = 0;
var searchButtonPresses = 0;


searchSubmitButtonE1.on("click", function(event){
    // triggers off of button click
    event.preventDefault();

    var citySearchBoxText = document.getElementById("searchInput").value; // Text we want stored. From the search bar
    searchHistoryPopulate(citySearchBoxText); // passes on the city name, which then is used to populate the searchHistoryArray
})


function searchHistoryPopulate(cityName) {
    // triggered by search button press 
    

    // Create elements which display to the screen as bullet points
    var searchHistoryListE1 = document.getElementById("searchHistoryList"); // id for the unorganized listed in html. The containder for the  
    var newHeading = document.createElement("li"); // creates the bullet point which will contain a search input. 
    var idTag = "searchInput" + searchHistoryArrayIndex; // creates the ID tag used in the display. ID incrments per iteration of this function


    // Updates the searchHistoryArray values
    searchHistoryArray.unshift(cityName); // adds last city name to beginning of the array. 
    searchHistoryArrayLength = searchHistoryArray.length; 
    desiredArrayLength = 7;

    if (searchHistoryArrayLength >= desiredArrayLength) {
        // this happens when there are too many searches.

        searchHistoryArray.pop(); // removes the oldest search once we reach our desired limit. Keeps the array max length equal to desiredArrayLength.
        searchHistoryArrayIndex = desiredArrayLength - 1; // assures the index does not exceed the maximum desired length. Important for referencing.   
        // index will always be one below the current array length
    }
    

    // Displays to screen under Recent Search History
    recentCitySearch1E1.text(searchHistoryArray[0]); // Displays to screen using what was typed into search bar. Appears in the search box with the green dashed borders
    recentCitySearch2E1.text(searchHistoryArray[1]);
    recentCitySearch3E1.text(searchHistoryArray[2]);
    recentCitySearch4E1.text(searchHistoryArray[3]);
    recentCitySearch5E1.text(searchHistoryArray[4]);
    recentCitySearch6E1.text(searchHistoryArray[5]);

     
    // sets to local storage
    localStorage.setItem("searchInputStorage1", searchHistoryArray[0]); // for the first text under search history 1
    localStorage.setItem("searchInputStorage2", searchHistoryArray[1]);
    localStorage.setItem("searchInputStorage3", searchHistoryArray[2]);
    localStorage.setItem("searchInputStorage4", searchHistoryArray[3]);
    localStorage.setItem("searchInputStorage5", searchHistoryArray[4]);
    localStorage.setItem("searchInputStorage6", searchHistoryArray[5]);
    

    if (searchHistoryArrayLength < desiredArrayLength) {
        // triggers only if the current is less than a certain amount. 

        searchHistoryArrayIndex += 1; // incriments index per push.  
    }
  
    
    // debugging 
    console.log("\n");
    console.log(searchHistoryArray);
    console.log("New Heading ID " + newHeading.getAttribute("id") + " | Current Array Index " + searchHistoryArrayIndex + " | array Length " + searchHistoryArrayLength);
    
}


$("#recentCitySearch1").text(localStorage.getItem("searchInputStorage1"));
$("#recentCitySearch2").text(localStorage.getItem("searchInputStorage2"));
$("#recentCitySearch3").text(localStorage.getItem("searchInputStorage3"));
$("#recentCitySearch4").text(localStorage.getItem("searchInputStorage4"));
$("#recentCitySearch5").text(localStorage.getItem("searchInputStorage5"));
$("#recentCitySearch6").text(localStorage.getItem("searchInputStorage6"));


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



/* this was working before


    // creates and determines what elements will be displayed on screen. 

    newHeading.setAttribute("id", idTag);
    newHeading.innerText = cityName;
    searchHistoryListE1.appendChild(newHeading);



for(var i = 0; i < searchHistoryArrayIndex; i++) {
        
        
        newHeading.setAttribute("id", idTag);
        newHeading.innerText = searchHistoryArray[i]; // access the array and populates the required city
        searchHistoryListE1.appendChild(newHeading);
    }





    // sets to local storage
    var storageLocal = "searchInputStorage" + searchHistoryArrayIndex;
        // var storageLocal = "searchInputStorage" + searchHistoryArrayIndex;
    localStorage.setItem(storageLocal, cityName); // like declaring a new variable. 
    localStorage.setItem("searchInputStorage", cityName); // for the first text under search history 1




    // Once the dust settles
    recentCitySearch1E1.text(cityName); // Displays to screen using what was typed into search bar. Appears in the search box with the green dashed borders


    // sets to local storage
    var storageLocal = "searchInputStorage" + searchHistoryArrayIndex;
        // var storageLocal = "searchInputStorage" + searchHistoryArrayIndex;
    localStorage.setItem(storageLocal, cityName); // like declaring a new variable. 
    localStorage.setItem("searchInputStorage", cityName); // for the first text under search history 1



*/