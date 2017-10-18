var config = require('./config');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var exec = require('child_process').exec;

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
	//verify that the payload is a push from the correct repo
    
    //verify repository.name == 'expected repo name' or repository.full_name = 'user name/expected repo name'

	console.log(req.body.pusher.name + ' just pushed to ' + req.body.repository.name);

	console.log('pulling code from GitHub...');

	// reset any changes that have been made locally
	exec('git -C '+config.projectDir+' reset --hard', execCallback);

	// and ditch any files that have been added locally too
	exec('git -C '+config.projectDir+' clean -df', execCallback);

	// now pull down the latest
	exec('git -C '+config.projectDir+' pull -f', execCallback);

	// and run the startup script
	exec('python '+config.projectDir+'/'+config.startupScript, execCallback);
});

app.listen(5000, function () {
    console.log('listening on port 5000')
    console.log(config.projectDir)
});

function execCallback(err, stdout, stderr) {
	if(stdout) console.log(stdout);
	if(stderr) console.log(stderr);
}