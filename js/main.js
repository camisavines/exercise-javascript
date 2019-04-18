// User code here

// HINT: start here: https://swapi.co/api/films/
// User code here

// HINT: start here: https://swapi.co/api/films/

(function() {
    
    $(document).ready(init)
    
    function init() {

                
        // Create a request variable and assign a new XMLHttpRequest object to it.
        var request = new XMLHttpRequest()

        // Open a new connection, using the GET request on the URL endpoint
        request.open('GET', 'https://swapi.co/api/films/', true)
        request.onload = function() {
            // Begin accessing JSON data here
            var swapi = JSON.parse(this.response);
            // globalSwapi = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) { // not exactly sure why the status need to be between 200 and 400
                swapi.results.forEach(element => {
                    console.log(element.title);
                });
                populateDropdown(swapi);
                populateTable(swapi);
            } else {
                console.log("error");
            }
        };

        // Then send request
        request.send()


        // $("li").click(getCharacters(globalSwapi, this.innerHTML));

        // const dropdownItems = document.getElementsByName("li");
        // console.log(dropdownItems);
        // for (var i in dropdownItems) {
        //     console.log(i);
        // }
        // for (var obj in dropdownObject) {
            // console.log('greetings');
            // if ($(obj).click()) {
            //     console.log(this.index);
            //     getCharacters(globalSwapi, this.href);
                // get this item's href value and send it to getCharaters()
                // getCharacter(globalSwapi, hrefVal)
        //     }
        // }


        // $(".myMenu").innerHTML.click(function() {
        //     console.log("Something in menu was clicked");
        //     getCharacters(globalSwapi, this.i);
        // }); 

 
        
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
            console.log(link);
            link.setAttribute("href", "#");
            link.setAttribute("i", i);
            listItem.appendChild(link);

            // Then put the line of code in the dropdown
            $(".myMenu").append(listItem);
        }
    }



    function getCharacters(swapi, index) {
        // console.log("in get characters with swap and " + index);
    }

    function populateTable(swapi) {
        console.log("populateTable");
        for (var i = 0; i < swapi.results.length; i++) {
            var currentFilm = swapi.results[i].characters;
            for (var j in currentFilm) {

                console.log(currentFilm[j].name);


            }
        }
    }


})();
