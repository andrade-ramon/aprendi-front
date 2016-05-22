#!/bin/bash
# Deploy script for zeus

set -ve

ZEUS_TEMP_DIR=/tmp/zeus
ZEUS_PROD_DIR=/opt/app

git clone https://github.com/qualfacul/zeus.git $ZEUS_TEMP_DIR
cd $ZEUS_TEMP_DIR

npm install
cp /mnt/bucket/zeus/production.js $ZEUS_TEMP_DIR/app/scripts/properties.js

bower install --allow-root --config.interactive=false
grunt build

mv $ZEUS_TEMP_DIR/bower_components $ZEUS_TEMP_DIR/app

mv $ZEUS_PROD_DIR $ZEUS_PROD_DIR.tmp
mv $ZEUS_TEMP_DIR $ZEUS_PROD_DIR
rm -rf $ZEUS_PROD_DIR.tmp
