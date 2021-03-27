var searchSubmitButtonE1 = $("#searchSubmitButton");
var recentCitySearch1E1 = $("#recentCitySearch1"); // The city blocks displayed in search history 

var searchHistoryArray= [];
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
    


    // creates and determines what elements will be displayed on screen.
    
    
    
    // where you left off yesterday                 ---             - --    ----    ----



    newHeading.setAttribute("id", idTag);
    newHeading.innerText = searchHistoryArray; // access the array and populates the required city
    searchHistoryListE1.appendChild(newHeading);
    

 
    
     
    // sets to local storage
    var storageLocal = "searchInputStorage" + searchHistoryArrayIndex;
        // var storageLocal = "searchInputStorage" + searchHistoryArrayIndex;
    localStorage.setItem(storageLocal, cityName); // like declaring a new variable. 
    localStorage.setItem("searchInputStorage", cityName); // for the first text under search history 1




    // Once the dust settles
    recentCitySearch1E1.text(cityName); // Displays to screen using what was typed into search bar. Appears in the search box with the green dashed borders
    
    if (searchHistoryArrayLength < desiredArrayLength) {
        // triggers only if the current is less than a certain amount. 

        searchHistoryArrayIndex += 1; // incriments index per push.  
    }
  
    
    // debugging 
    console.log("\n");
    console.log(searchHistoryArray);
    console.log("New Heading ID " + newHeading.getAttribute("id") + " | local storage name " + storageLocal + " | Current Array Index " + searchHistoryArrayIndex + " | array Length " + searchHistoryArrayLength);
    
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




*/