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
  * Wondering where is the mounted /code directory? Run this:  'sudo docker inspect docker_spotscore_1' (or any other given name) and look for the mounting information in section "Mounts" > "Source". You can mount another host folder by modifying docker-compose.yml for yourself.


