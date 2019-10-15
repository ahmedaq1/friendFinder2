// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });



    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    function calculateDiff(array1, array2) {
        var totalDiff = 0;
        for (let i = 0; i < array1.length; i++) {
            totalDiff += Math.abs(array1[i] - array2[i]);
        }

        return totalDiff;
    }

    app.post("/api/friends", function(req, res) {
        var totalDiff;
        var minmumDiff = Number.MAX_VALUE;
        var bestMatch;
        var userInput = req.body
        var userName = userInput.name;
        var userScores = userInput.scores.map(scores => parseInt(scores, 10));
        for (let i = 0; i < friends.length; i++) {
            var totalDiff = calculateDiff(friends[i].scores, userScores)
            if (totalDiff < minmumDiff) {
                minmumDiff = totalDiff;
                bestMatch = friends[i];


            }

        }

        friends.push(userInput);
        res.json(bestMatch);




    });



};