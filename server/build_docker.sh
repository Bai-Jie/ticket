#!/bin/bash
yarn run prod
docker build -t docker.baijie.gq/ticket/api .
