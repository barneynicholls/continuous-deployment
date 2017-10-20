var config = require('./config');


lt=require('localtunnel')

function localTunnel(port, subdomain, local_host) {
   var  tunnel = lt(port, { subdomain: subdomain, local_host: local_host }, function (err, tunnel) {
        if (err) {
            console.error("localTunnelCode Failed with error: " + err)
        } else {
			console.info("localTunnel connected and webhook url should be : " + tunnel.url + "/payload")
			console.info("to confirm this is running use a browser to visit : " + tunnel.url)
        }
	})
	
    tunnel.on('close', function () {
		console.error("tunnel -> Tunnel Closed...Going to Restart")
        tunnel = lt(port, { subdomain: subdomain }, function (err, tunnel) {
            if (err) {
				console.error("localTunnelCode Restart Failed with error: " + err)
            } else {
				console.warn("localTunnelCode Re-Connected and webhook url should be : " + tunnel.url + "/payload")
            }
        })
	})
	
    tunnel.on('error', function (err) {
		console.error("tunnel Error -> " + err)
    })
}

localTunnel(config.port,config.subdomain,'localhost');




var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var execSync = require('child_process').execSync;

function gitPull(){
	var pullingFromGit = 'pulling code from GitHub: ';
	
	// reset any changes that have been made locally
	var gitReset = 'git -C '+config.projectDir+' reset --hard';
	console.log(pullingFromGit+' '+gitReset);
	execSync(gitReset, execCallback);

	// and ditch any files that have been added locally too
	var deleteLocal = 'git -C '+config.projectDir+' clean -df';
	console.log(pullingFromGit+' '+deleteLocal);
	execSync(deleteLocal, execCallback);

	// now pull down the latest
	var pull = 'git -C '+config.projectDir+' pull -f';
	console.log(pullingFromGit+' '+pull);
	execSync(pull, execCallback);

	// and run the startup script
	console.log('execute startup: '+config.startupCommand);
	execSync(config.startupCommand, execCallback);

	console.log('update complete');
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.htm');
	console.log('get /');
});

app.get('/payload', function (req, res) {
    res.sendStatus(200);
	console.log('get /payload');
});

app.post('/payload', function (req, res) {
	//recommend that you verify the payload is a push from the correct repo
    //verify repository.name == 'expected repo name' or repository.full_name = 'user name/expected repo name'

	console.log(req.body.pusher.name + ' just pushed to ' + req.body.repository.name);

	gitPull();
});

app.get('/pull', function (req, res) {
	console.log('get /pull');
	gitPull();
    res.sendStatus(200);
});

app.listen(config.port, function () {
    console.log('listening on port '+config.port)
    console.log('project dir: '+config.projectDir)
});

function execCallback(err, stdout, stderr) {
	if(stdout) console.log(stdout);
	if(stderr) console.log(stderr);
}