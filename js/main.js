// User code here
// HINT: start here: https://swapi.co/api/films/

(function() {
    
    $(document).ready(init('https://swapi.co/api/films/'))
    var reload = 1;
    var apiLinks = {
        "films": "https://swapi.co/api/films/",
        "people": "https://swapi.co/api/people/",
        "planets": "https://swapi.co/api/planets/",
        "species": "https://swapi.co/api/species/",
        "starships": "https://swapi.co/api/starships/",
        "vehicles": "https://swapi.co/api/vehicles/"
    };

    
    function init(link) {    
        
        // Create a request variable and assign a new XMLHttpRequest object to it.
        var request = new XMLHttpRequest();

        // Open a new connection, using the GET request on the URL endpoint
        request.open('GET', link, true)
        request.onload = function() {
            // Begin accessing JSON data here
            var swapi = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) { // not exactly sure why the status need to be between 200 and 400
                swapi.results.forEach(element => {
                    console.log(element.title);
                });
                main(swapi);
            } else {
                console.log("error");
            }
        };

        // Then send request
        request.send();
    }


    function main(swapi) {
        if (reload == 1) {
            populateDropdown(swapi);
            reload++;
            // prevents multiple copies of the titles in the dropdown menu
        }

        $("li").mousedown(function() {
            // console.log(this);
            populateTable(swapi, (this.getAttribute("id")));
        });

    }


    function populateDropdown(swapi) {
        for (var i = 0; i < swapi.results.length; i++) {

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
        }
    }

    function populateTable(swapi, index) {



        $("tbody").empty(); // this will clear the table each time.

        for (var i in swapi.results[index].characters) {

            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdShips = document.createElement('td');
            const a = document.createElement('a');
            const xIcon = document.createElement('span');
            xIcon.setAttribute("class", "glyphicon glyphicon-remove");

            var listOfCharacters = swapi.results[index].characters;
            console.log(listOfCharacters[i]);

            var ref = new XMLHttpRequest();
            ref.open("GET", listOfCharacters[i], true);
            ref.onload = function() {
                var character = JSON.parse(this.response);
                if (ref.status >= 200 && ref.status < 400) { // not exactly sure why the status need to be between 200 and 400
                    tdName.innerText = character.name;
                    if (character.vehicles.length < 1) {
                        tdShips.innerText = "None";
                        return;
                    } else {
                        for (var j = 0; j < character.vehicles.length; j++) {
                            var listOfVehicles = character.vehicles;
                            console.log(listOfVehicles[j]);

                            var ref2 = new XMLHttpRequest();
                            ref2.open("GET", listOfVehicles[j], true);
                            ref2.onload = function() {
                                var vehicle = JSON.parse(this.response);
                                if (ref2.status >= 200 && ref2.status < 400) {
                                    if (j != character.vehicles.length - 1) {
                                        tdShips.innerText += vehicle.name + ",";
                                    } else {
                                        tdShips.innerText += vehicle.name;
                                    }
                                    console.log(tdShips);
                                }
                            };

                            ref2.send();

                        }
                    }
                } else {
                    console.log("error");
                }
            };

            // Then send request
            ref.send();

            
            tr.appendChild(tdName);
            tr.appendChild(tdShips);
            $("tbody").append(tr);

        }

    }


})();
