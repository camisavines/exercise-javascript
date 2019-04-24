var swapi = $.getJSON("https://swapi.co/api/films/", function(result) {
    return result;
});

function populateDropdown(swapi) {
    $(".myMenu").empty();
    var goodResult = 0;
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
        goodResult++;
    }

    return 1;
}



QUnit.test("populateDropdown", function(assert) {
    assert.ok(populateDropdown, "populateDropdown function exists");
});

QUnit.test("type of populateDropdown", function(assert) {
    assert.ok(typeof populateDropdown == 'function', "populateDropdown is of the type function");
});

QUnit.test("populateDropdown works", function(assert) {
    assert.equal(1, populateDropdown(), "Passes!");
})





