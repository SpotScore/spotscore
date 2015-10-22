# SpotScore

## Project health
[![Build Status](https://travis-ci.org/SpotScore/spotscore.svg?branch=master)](https://travis-ci.org/SpotScore/spotscore)
[![Code Climate](https://codeclimate.com/github/SpotScore/spotscore/badges/gpa.svg)](https://codeclimate.com/github/SpotScore/spotscore)
[![Test Coverage](https://codeclimate.com/github/SpotScore/spotscore/badges/coverage.svg)](https://codeclimate.com/github/SpotScore/spotscore/coverage)
[![Dependencies](https://david-dm.org/spotscore/spotscore.svg)](https://david-dm.org/spotscore/spotscore)


## Development

### Docker Container Architecture

[![Iteration 1 containers](https://dl.dropboxusercontent.com/u/2060778/spotscore-docker-1.svg)](https://dl.dropboxusercontent.com/u/2060778/spotscore-docker-1.svg)


### Environment Setup for Linux (the easy way)

Prerequisites:
  * Docker Engine: https://docs.docker.com/installation/ubuntulinux/
  * Docker Compose: https://docs.docker.com/compose/install/

Run containers:
  1. Git clone code from https://github.com/SpotScore/spotscore or go to your existing project
  2. Start terminal and change working directory to be the project's folder.
  3. Run:  'sudo docker-compose up'
  4. Images are downloaded, containers are run. Go to http://localhost:3000 with your browser and you should get a response.


### Environment Setup for Windows and OS X (includes additional step of drinking coffee)

Prerequisites:
  * Virtualbox: https://www.virtualbox.org/wiki/Downloads 
  * Vagrant: https://www.vagrantup.com/downloads.html 
  * Vagrant's plugin vagrant-docker-compose: https://github.com/leighmcculloch/vagrant-docker-compose

Optional:
  * Vagrant plugin vagrant-vbguest: https://github.com/dotless-de/vagrant-vbguest (installs latest Vbox Guest Additions)

Run containers:
  1. Git clone code from https://github.com/SpotScore/spotscore or go to your existing project
  2. Start terminal and change working directory to be the project's folder.
  3. Run:  'vagrant up'.
  4. Go drink a coffee.
  4. Vagrant box and docker images are downloaded, containers are run. Go to http://localhost:3000 with your browser and you should get a response.


### Want more information?

Go visit our [Wiki pages](https://github.com/SpotScore/spotscore/wiki)


## Chat with us!

[![Join the chat at https://gitter.im/SpotScore/spotscore](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/SpotScore/spotscore)
