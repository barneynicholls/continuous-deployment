# Continuous Deployment

Continuous deployment of code to raspberry pi

## Getting Started

On your pi open a terminal window and ensure it is updated.

```
sudo apt-get update
```

Ensure git is installed

```
sudo apt-get install git
```

Clone this repository to your pi

```
git clone https://github.com/barneynicholls/continuous-deployment.git
cd continuous-deployment
ls
```

### Update your config 

Copy sample.config.js and rename to config.js. Update project directory location within this file to your required destination for the project the node app will be downloading and updating.

```
// path of where the retrieved git repo should be written
config.projectDir = "~/projects/mycdproject";
```

```
// path of where the retrieved git repo should be written
config.projectDir = "~/projects/weatherpi";
```



## Acknowledgments

based on a the following blog post and repo

* [GitHub Continuous Deployment to a Raspberry Pi](https://dzone.com/articles/github-continuous-deployment-to-a-raspberry-pi)
* [Wackcoon](https://raw.githubusercontent.com/DanielEgan/wackcoon-hook)