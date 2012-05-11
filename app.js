var MyApp = require("./myapp"),
	util = require("util");

var myapp = new MyApp();

myapp.getVolumes({}, function(err, data) {
	util.puts("\r\nList Volumes ****************************");
	if (err) { util.puts(err); }
	else {
		util.puts(data);
	}
});

myapp.getClients({}, function(err, data) {
	util.puts("\r\nList Clients ****************************");
	if (err) { util.puts(err); }
	else {
		util.puts(data);
	}
});

