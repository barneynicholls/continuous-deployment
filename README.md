# Continuous Deployment

Continuous deployment of code to raspberry pi

## Getting Started

On your pi open a terminal window and ensure it is updated.

```
$ sudo apt-get update
```

Ensure git is installed

```
$ sudo apt-get install git
```

Clone this repository to your pi and confirm the files have been downloaded

```
$ git clone https://github.com/barneynicholls/continuous-deployment.git
$ cd continuous-deployment
$ ls
```

Install required packages locally

```
$ npm install
```

This will install required packages using the node package manager

### Update your config 

Use nano to create a copy of the sample config and update this with your settings

```
$ nano sample.config.js
```

Make any required changes to the directory path, then save file as config.js.

CTRL-O to write out the file, rename it to config.js.  Select Yes when prompted to 'Save File Under Different Name?'.  CTRL-X to exit nano.

Ensure the directory exists locally and clone you git repo into it e.g. 

```
$ cd ~/projects
$ git clone https://github.com/username/mycdproject.git
```

### Run your app 

You should now be able to run your node app locally

```
$ node app.js
```

Opening a browser and entering the url http://localhost:5000 should prove the application is running


## Attach your webhook 

Go to Settings | Webhooks on your git repository.

Click the 'Add Webhook' button.

Enter a Payload URL e.g.

```
https://mycdproject.localtunnel.me/payload
```

Select application/json as the content type

Then click the 'Add Webhook' button at the bottom of the page.

Now check a change in and see what happens.

## Acknowledgments

based on a the following blog post and repo

* [GitHub Continuous Deployment to a Raspberry Pi](https://dzone.com/articles/github-continuous-deployment-to-a-raspberry-pi)
* [Wackcoon](https://raw.githubusercontent.com/DanielEgan/wackcoon-hook)

Thanks also to [julianfrank](https://github.com/julianfrank) for the localtunnel code example found [here](https://github.com/localtunnel/localtunnel/issues/156)