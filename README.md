# SpotScore

## Project health
[![Build Status](https://travis-ci.org/SpotScore/spotscore.svg?branch=master)](https://travis-ci.org/SpotScore/spotscore)
[![Code Climate](https://codeclimate.com/github/SpotScore/spotscore/badges/gpa.svg)](https://codeclimate.com/github/SpotScore/spotscore)
[![Test Coverage](https://codeclimate.com/github/SpotScore/spotscore/badges/coverage.svg)](https://codeclimate.com/github/SpotScore/spotscore/coverage)


## Development

### Environment Setup for Linux (the easy way)

Prerequisites:
  * Docker Engine: https://docs.docker.com/installation/ubuntulinux/
  * Docker Compose: https://docs.docker.com/compose/install/

Run containers:
  1. Git clone code from https://github.com/SpotScore/spotscore or go to your existing project
  2. Start terminal and change working directory to docker/ in the project folder.
  3. Run:  'sudo docker-compose up'
  4. Images are downloaded, containers are run. Go to http://localhost:3000 with your browser and you should get a response.

More information:
  * Code folder is the project root folder. Data folder is sample_data/.


### Environment Setup for Windows (the hard way)

Prerequisites:
  * Virtualbox: https://www.virtualbox.org/wiki/Downloads 
  * Vagrant: https://www.vagrantup.com/downloads.html 
  * Vagrant's plugin vagrant-docker-compose: https://github.com/leighmcculloch/vagrant-docker-compose

Run containers:
  1. Git clone code from https://github.com/SpotScore/spotscore or go to your existing project
  2. Start terminal and change working directory to vagrant/ in the project folder.
  3. Run:  'vagrant up'.
  4. Go drink a coffee.
  4. Vagrant box and docker images are downloaded, containers are run. Go to http://localhost:3000 with your browser and you should get a response.

More information:
  * Code folder is the project root folder. Data folder is sample_data/.
