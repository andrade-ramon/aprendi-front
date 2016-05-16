#!/bin/bash
set -v

# Install logging monitor. The monitor will automatically pick up logs sent to
# syslog.
curl -s "https://storage.googleapis.com/signals-agents/logging/google-fluentd-install.sh" | bash
service google-fluentd restart &

# Install dependencies from apt
apt-get update
apt-get install -yq ca-certificates git build-essential supervisor nginx

# Install nodejs
sudo mkdir /opt/nodejs
curl https://nodejs.org/dist/v4.2.2/node-v4.2.2-linux-x64.tar.gz | tar xvzf - -C /opt/nodejs --strip-components=1
ln -s /opt/nodejs/bin/node /usr/bin/node
ln -s /opt/nodejs/bin/npm /usr/bin/npm

# Get the application source code from the Google Cloud Repository.
# git requires $HOME and it's not set during the startup script.
export HOME=/root
git config --global credential.helper gcloud.sh
git clone https://github.com/qualfacul/zeus.git /opt/app/zeus

# Install app dependencies
cd /opt/app/zeus
npm install
npm install -g grunt-cli grunt bower
ln -s /opt/nodejs/bin/bower /usr/bin/bower

export NODE_ENV="production"
bower install
grunt build

cat >/etc/nginx/sites-available/default << EOF
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    root /opt/app/zeus/app;
    index index.html;
    server_name zeus;
    location / {
        try_files $uri $uri/ =404;
    }
}
EOF

service nginx restart
service supervisor restart
supervisorctl reread
supervisorctl update

mv /opt/app/zeus/bower_components /opt/app/zeus/app


