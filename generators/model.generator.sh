#!/bin/sh

## DB Configuration
HOST=localhost
DB_NAME=newproject
USERNAME=postgres
PASSWORD=postgres
PORT=5400

OUT=./models
CONFIG=./generators/model.generator.json

## Installing sequelize-auto
if [! npm list -g | grep sequelize-auto]
then
	npm install -g sequelize-auto
fi

if [ ! -d $OUT ]; then
	mkdir -p $OUT;
fi

sequelize-auto -o $OUT -d $DB_NAME -h $HOST -u $USERNAME -p $PORT -x $PASSWORD -e postgres --config $CONFIG