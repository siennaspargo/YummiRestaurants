module.exports = function (app) {

    // api route to friends object
    app.get("/api/friends", function (req, res) {
        res.json(friendsdata);
    });


    // api post method 
    app.post('/api/friends', function (req, res) {
        // Capture the user input object
        var userData = req.body;

        // console.log(userData);

        // console.log('userInput = ' + JSON.stringify(userInput));

        var userResponses = userData.scores;
        // console.log('userResponses = ' + userResponses);

        // Compute best friend match
        var matchName = '';
        var matchImage = '';
        var totalDifference = 200; // Make the initial value big for comparison

        // Here we loop through all the friend possibilities in the database.
        // Examine all existing friends in the list
        for (var i = 0; i < friendsdata.length; i++) {
            // console.log('friend = ' + JSON.stringify(friends[i]));

            // Compute differenes for each question
            var diff = 0;
            for (var j = 0; j < userResponses.length; j++) {
                diff += Math.abs(friendsdata[i].scores[j] - userResponses[j]);
            }
            // console.log('diff = ' + diff);
            // totalDifference = diff;

            // If lowest difference, record the friend match
            if (diff < totalDifference) {
                
                totalDifference = diff;

                matchName = friendsdata[i].name;
                matchImage = friendsdata[i].photo;
                // console.log(matchName);
                // console.log(matchImage);
            }
        }


        // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
        // the database will always return that the user is the user's best friend).
        friendsdata.push(userData);