// Globals
var client;
var base = "https://api.mlab.com/api/1/databases/underground-routes";
var key = "?apiKey=";

// Called when dom is Loaded
document.addEventListener("DOMContentLoaded", function() {
	client = new HttpClient(base, key);
	client.get("/collections/routes", function(response) {
		console.log(JSON.parse(response));
		buildRoutes(JSON.parse(response));
	});
}, false);

function buildRoutes(routes) {
	var template = document.getElementById("template").innerHTML;
	var target   = document.getElementById("content");
 	Mustache.parse(template);
	routes.forEach(function(route, i) {
		target.innerHTML += Mustache.render(template, route);
	});
}

var HttpClient = function(base, key) {

		this.base = base;
		this.key = key;

    this.get = function(aUrl, aCallback) {
			var anHttpRequest = new XMLHttpRequest();
			var url = base + aUrl + key;
			anHttpRequest.onreadystatechange = function() { 
					if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
							aCallback(anHttpRequest.responseText);
			}
			anHttpRequest.open("GET", url, true);            
			anHttpRequest.send(null);
		}
		
		this.delete = function(id) {
			var anHttpRequest = new XMLHttpRequest();
			var url = base + '/collections/routes/' + id + key;
			anHttpRequest.onreadystatechange = function() { 
					if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
							aCallback(anHttpRequest.responseText);
			}
			anHttpRequest.open("DELETE", url, true);            
			anHttpRequest.send(null);
		}
}

function deleteRoute(id) {
	if (confirm("Confirm Delete")) {
		console.log("Deleting! " + id);
		client.delete(id);
		alert('Deleted');
		location.reload();
	}
}