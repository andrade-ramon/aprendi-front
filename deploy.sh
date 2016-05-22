#!/bin/bash
set -ve
gcloud compute ssh zeus --command /opt/app/configuration/deploy-for-instance.sh
