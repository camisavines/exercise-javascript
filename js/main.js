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
        
        for (var i = 0 ; i < swapi.results[index].characters.length; i++){

            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdShips = document.createElement('td');
            // const a = document.createElement('a');
            // a.setAttribute("href", "#");
            // const xIcon = document.createElement('span');
            // xIcon.setAttribute("class", "glyphicon glyphicon-remove");

            var listOfCharacters = swapi.results[index].characters;
            $.getJSON(listOfCharacters[i], function(character) {
                tdName.innerText = character.name;
                if (character.vehicles.length < 1) {
                    tdShips.innerText = "None";
                    return;
                } else {
                    for (var j = 0; j < character.vehicles.length; j++) {
                        var listOfVehicles = character.vehicles;
                        $.getJSON(listOfVehicles[j], function(vehicle) {
                            tdShips.innerText += vehicle.name + ",";
                        })
                    }
                }
            });
            
            // tdName.append(" <span class='glyphicon glyphicon-remove'></span>");
            // console.log(tdName);
            tr.appendChild(tdName);
            tr.appendChild(tdShips);
            $("tbody").append(tr);


        }

    }


})();
