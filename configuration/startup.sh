#!/bin/bash
set -v

# Install logging monitor. The monitor will automatically pick up logs sent to syslog.
curl -s "https://storage.googleapis.com/signals-agents/logging/google-fluentd-install.sh" | bash
service google-fluentd restart &

export GCSFUSE_REPO=gcsfuse-`lsb_release -c -s`
echo "deb http://packages.cloud.google.com/apt $GCSFUSE_REPO main" | sudo tee /etc/apt/sources.list.d/gcsfuse.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -

# Install dependencies from apt
apt-get update
apt-get install -yq nginx ruby-compass gcsfuse

# Install nodejs
mkdir /opt/nodejs
curl https://nodejs.org/dist/v4.2.2/node-v4.2.2-linux-x64.tar.gz | tar xvzf - -C /opt/nodejs --strip-components=1
ln -s /opt/nodejs/bin/node /usr/bin/node
ln -s /opt/nodejs/bin/npm /usr/bin/npm

# Get the application source code from the Google Cloud Repository.
# git requires $HOME and it's not set during the startup script.
export HOME=/root
git config --global credential.helper gcloud.sh
git clone https://github.com/qualfacul/zeus.git /opt/app

# Install app dependencies
cd /opt/app
npm install
npm install -g grunt-cli grunt bower
ln -s /opt/nodejs/bin/bower /usr/bin/bower
ln -s /opt/nodejs/bin/grunt /usr/bin/grunt

# Get bucket files
mkdir /mnt/bucket
mkdir /etc/nginx/ssl
gcsfuse qual-facul.appspot.com /mnt/bucket
cp /mnt/bucket/ssl/qualfacul.com.key /etc/nginx/ssl
cp /mnt/bucket/ssl/qualfacul.com.crt /etc/nginx/ssl
cp /mnt/bucket/zeus/production.js /opt/app/app/scripts/properties.js

export NODE_ENV="production"
bower install --allow-root --config.interactive=false
mv /opt/app/bower_components /opt/app/app
grunt build

nginx -s reload
