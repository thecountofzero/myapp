var myapp = require("./myapp");

// Example of what a function would look like that a route called
var getPlayers = function(params, callback) {

	// Call the getPlayers function of the API
	myapp.getPlayers(params, function(err, data) {

		// Execute callback that responds with return value
		callback(err, data);
	});
};

// Test getPlayers
getPlayers({}, function(err, data) {

	// Error found, do something with it
	if (err) {
		console.log(err);
	}
	else {
		// Send the data back to the browser
		console.log(data);
	}
});