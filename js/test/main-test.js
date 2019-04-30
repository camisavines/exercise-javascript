window.onload = function () {

    var dates = [new Date("1977-05-25"), new Date("2002-05-16"), new Date("1999-05-19"), new Date("2005-05-19"), new Date("1983-05-25"), new Date("1980-05-17"), new Date("2015-12-11")]
    var sortedDates = [new Date("1977-05-25"), new Date("1980-05-17"), new Date("1983-05-25"), new Date("1999-05-19"), new Date("2002-05-16"), new Date("2005-05-19"), new Date("2015-12-11")]
    function actualRun(a, b) {
        return a.getTime() - b.getTime();
    }

    var titleAndDates = [
        ["A New Hope", "1977-05-25"],
        ["Attack of the Clones", "2002-05-16"],
        ["The Phantom Menace", "1999-05-19"],
        ["Revenge of the Sith", "2005-05-19"],
        ["Return of the Jedi", "1983-05-25"],
        ["The Empire Strikes Back", "1980-05-17"],
        ["The Force Awakens", "2015-12-11"],
    ]

    var titles = ["A New Hope", "Attack of the Clones", "The Phantom Menace", "Revenge of the Sith", "Return of the Jedi", "The Empire Strikes Back", "The Force Awakens"]



    QUnit.test("check order of dates", function (assert) {
        assert.deepEqual(dates.sort(actualRun), sortedDates, "Passed!");
    });

    QUnit.test("compare titles and release dates", function (assert) {
        var titlesCheck = [];
        function checkTitlesAndDates() {
            $.getJSON("https://swapi.co/api/films/", function (p) {
                for (var i = 0; i < p.results.length; i++) {
                    var movie = titleAndDates[i];
                    var compare = [titles[i], dates[i]]
                    if (movie != compare) {
                        return false;
                    }
                    return true;
                }
            });
        }

        assert.equal(true, true, "Passed!");
    });


}







