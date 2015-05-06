var hapi = require ("hapi");
var server = new hapi.Server();

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
  layout: "default" //as in default.html
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
    reply.view("classes", {
      title: "Classes"
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
