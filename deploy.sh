#!/bin/bash
set -ve
gcloud compute ssh zeus --zone us-east1-b --command /opt/app/configuration/deploy-for-instance.sh
