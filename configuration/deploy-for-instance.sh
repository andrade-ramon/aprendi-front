#!/bin/bash
# Deploy script for zeus

set -ve

ZEUS_TEMP_DIR=/tmp/zeus
ZEUS_PROD_DIR=/opt/app

git clone https://github.com/qualfacul/zeus.git $ZEUS_TEMP_DIR

mkdir $ZEUS_TEMP_DIR/bucket
gcsfuse qual-facul.appspot.com $ZEUS_TEMP_DIR/bucket

cp $ZEUS_TEMP_DIR/bucket/zeus/production.js $ZEUS_TEMP_DIR/app/scripts/properties.js
fusermount -u $ZEUS_TEMP_DIR/bucket
rm -r $ZEUS_TEMP_DIR/bucket

cd $ZEUS_TEMP_DIR
npm install
bower install --allow-root --config.interactive=false
grunt build

mv $ZEUS_TEMP_DIR/bower_components $ZEUS_TEMP_DIR/app

sudo mv $ZEUS_PROD_DIR $ZEUS_PROD_DIR.tmp
sudo mv $ZEUS_TEMP_DIR $ZEUS_PROD_DIR
sudo rm -rf $ZEUS_PROD_DIR.tmp
