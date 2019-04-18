// User code here
// HINT: start here: https://swapi.co/api/films/

(function() {

    var apiLinks = {
        "films": "https://swapi.co/api/films/",
        "people": "https://swapi.co/api/people/",
        "planets": "https://swapi.co/api/planets/",
        "species": "https://swapi.co/api/species/",
        "starships": "https://swapi.co/api/starships/",
        "vehicles": "https://swapi.co/api/vehicles/"
    }
    
    $(document).ready(init('https://swapi.co/api/films/'))
    var reload = 1;
    
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
            console.log(this);
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

        console.log("clicked");
        console.log(index);

        // $("tbody").innerHTML = ""; // this will clear the table each time.

        for (var i = 0; i < swapi.results[index].characters.length; i++) {

            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdShips = document.createElement('td');
            const a = document.createElement('a');
            const xIcon = document.createElement('span');
            xIcon.setAttribute("class", "glyphicon glyphicon-remove");

            var person;
            var ref = new XMLHttpRequest();
            ref.open("GET", swapi.results[index].characters[i], true);
            ref.onload = function() {
                // Begin accessing JSON data here
                var character = JSON.parse(this.response);
                person = character;
                if (ref.status >= 200 && ref.status < 400) { // not exactly sure why the status need to be between 200 and 400
                    tdName = character.name + " " + a.appendChild(xIcon);
                    for (var i in character.vehicles) {
                        console.log("another vehicle");
                    }

                } else {
                    console.log("error");
                }
            };

            // Then send request
            ref.send();

            

            tdName = person.name;
            console.log(tdName);

            $("tbody").append(tr.appendChild(tdName && tdShips));

        }

        // for (var i = 0; i < swapi.results.length; i++) {
        //     for (var j = 0; j < swapi.results[i].characters.length; j++) {
        //         var Person;
        //         // Create a request variable and assign a new XMLHttpRequest object to it.
        //         var request = new XMLHttpRequest()

        //         // Open a new connection, using the GET request on the URL endpoint
        //         request.open('GET', swapi.results[i].characters[j], true)
        //         request.onload = function() {
        //             // Begin accessing JSON data here
        //             var newName = JSON.parse(this.response);
        //             Person = newName;
        //             // globalSwapi = JSON.parse(this.response);
        //             if (request.status >= 200 && request.status < 400) { // not exactly sure why the status need to be between 200 and 400
        //                 console.log(newName.name);
        //             } else {
        //                 console.log("error");
        //             }
        //         };

        //         // Then send request
        //         request.send();

        //         $("tbody").append("<tr><td>"+ Person.name +"</td></tr>")


                // console.log(swapi.results[i].characters[j].name);
                // this is getting undefined each time

        //     }
        // }
    }


})();
