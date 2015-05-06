var hapi = require ("hapi");
var server = new hapi.Server();
var fs = require("fs");

server.connection({
  port: 8000
});

server.start();

server.views({
  path: "templates",
  engines: {
    html: require("handlebars")
  },
  layoutPath:"layouts", //as in the layouts folder
  layout: "default", //as in default.html
  partialsPath: "templates/partials",
  isCached: false
});

server.route({
  method: "GET",
  path: "/",
  handler: function(req, reply){
    reply.view("index", {
      title: "Home"
    });
  }
});

server.route({
  method: "GET",
  path: "/classes",
  handler: function(req, reply){
    fs.readFile("classes.json",
    "utf8", function(err, data) {
    reply.view("classes", {
      title: "Classes",
      classes: JSON.parse(data)
      });
    });
  }
});

server.route({
  method: "GET",
  path: "/assets/{param*}",
  handler: {
    directory: {
      path: "public"
    }
  }
});
