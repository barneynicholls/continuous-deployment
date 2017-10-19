// rename this file to config.js

var config = {};

// path of where the retrieved git repo should be written
config.projectDir = "~/projects/mycdproject";
// command line to restart your app
config.startupCommand = "python3.4 ~/projects/mycdproject/main.py";
// the port this app listens to localtunnel on
config.port = 5000;
// localtunnel subdomain (your choice may not be available if not try another identifier)
config.subdomain = 'mycdproject';

module.exports = config;