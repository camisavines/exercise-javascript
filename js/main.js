// User code here
// HINT: start here: https://swapi.co/api/films/

(function() {
    
    $(document).ready(init())
    
    function init() { 
        $.getJSON("https://swapi.co/api/films/", function(result) {
            main(result);
        });
    }

    var reload = 1;
    function main(swapi) {
        if (reload == 1) {
            populateDropdown(swapi);
            reload++; // prevents multiple copies of the titles in the dropdown menu
        }
        $("li").mousedown(function() {
            // console.log(this);
            populateTable(swapi, (this.getAttribute("id")));
        });
    }

    function populateDropdown(swapi) {
        $(".myMenu").empty();
        var goodResult = 0;
        var dates = []; // make an array of dates
        for (var j = 0; j < swapi.results.length; j++) {
            var date = swapi.results[j].release_date;
            dates[j] = new Date(date); // add all of the film release dates
        }
        var sortedDates = dates.sort(function(a, b) {
            return a.getTime() - b.getTime();
        })

        while (dates.length > 0) {
            var minDate = sortedDates[0];
            console.log(minDate.toDateString());

            for (var i = 0; i < swapi.results.length; i++) {
                if (minDate.toDateString() == new Date(swapi.results[i].release_date).toDateString()) {
                    console.log("add " + swapi.results[i].title);

                    //Make a quick reference to the current film
                    var film = swapi.results[i].title;

                    // Create 2 constants for the list item and the link inside
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');

                    // Set the href to the index of the film in results to reference its characters later.
                    // Then set the li tag's inner text to the link
                    link.innerHTML = film;
                    link.setAttribute("href", "#");
                    listItem.setAttribute("id", i);
                    listItem.appendChild(link);

                    // Then put the line of code in the dropdown
                    $(".myMenu").append(listItem);
                    goodResult++;
                    
                }       
            }
            sortedDates.shift();
        } 

    }

    function populateTable(swapi, index) {

        $("tbody").empty(); // clear the table each time.

        for (var i = 0 ; i < swapi.results[index].characters.length; i++){ 

            const xIcon = document.createElement('span');
            xIcon.setAttribute("class", "glyphicon glyphicon-remove");
            const a = document.createElement('a');
            a.appendChild(xIcon);
            console.log(a);

            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdShips = document.createElement('td');

            var listOfCharacters = swapi.results[index].characters;
            $.getJSON(listOfCharacters[i], function(character) {
                tdName.innerText = character.name + " ";
                tdName.appendChild(a);

                if (character.starships.length < 1) {
                    tdShips.innerText = "none";
                    return;
                } else {
                    var listOfVehicles = character.starships;
                    var thisCharactersStartships = "";
                    while (listOfVehicles.length > 0) {
                        if (listOfVehicles[1]) {
                            $.getJSON(listOfVehicles[0], function(vehicle) {
                                thisCharactersStartships += vehicle.name + ", ";
                                console.log(thisCharactersStartships);  
                            });
                        } else {
                            $.getJSON(listOfVehicles[0], function(vehicle) {
                                thisCharactersStartships += vehicle.name + " ";
                                tdShips.innerText = thisCharactersStartships;
                                console.log(thisCharactersStartships);  
                            });
                        }
                        listOfVehicles.shift();
                    }
                }
            });
            
            tr.appendChild(tdName);
            tr.appendChild(tdShips);
            $("tbody").append(tr);

        }

    }


})();
