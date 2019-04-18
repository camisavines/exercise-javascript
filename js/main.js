// User code here

// HINT: start here: https://swapi.co/api/films/
// User code here

// HINT: start here: https://swapi.co/api/films/

(function() {
    
    $(document).ready(init('https://swapi.co/api/films/'))

    var reload = 1;
    
    function init(link) {
        
        // Create a request variable and assign a new XMLHttpRequest object to it.
        var request = new XMLHttpRequest()

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

        



        populateTable(swapi);
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
            // console.log(link);
            link.setAttribute("href", "#");
            link.setAttribute("i", i);
            // listItem.setAttribute("onclick", "getCharacters()");
            // console.log(listItem);
            listItem.appendChild(link);

            // Then put the line of code in the dropdown
            $(".myMenu").append(listItem);
        }
    }



    function getCharacters(swapi, index) {
        console.log("in get characters with swap and " + index);
    }

    function populateTable(swapi, index) {

        for (var i in swapi.results[index]) {
            console.log(i.characters);
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

            }
        }
    }


})();
