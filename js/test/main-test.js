function square(x) { return x * x;}
// var square = function() {}
QUnit.test("square exits", function(assert) {
    assert.ok(square, "Something called square exists");
});

QUnit.test("square is a function", function(assert) {
    assert.ok(typeof square == 'function', "square is of the type function");
});


