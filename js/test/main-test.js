(function() {

    alert("Main tests");

    QUnit.test( "hello test", function( assert ) {
        assert.ok( 1 == "1", "Passed!" );
    });

})();