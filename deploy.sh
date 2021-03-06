#!/bin/bash
set -e

export AWS_PROFILE=transitmatters
export AWS_REGION=us-east-1

pushd server/ > /dev/null
chalice package --merge-template frontend-cfn.json cfn/
aws cloudformation package --template-file cfn/sam.json --s3-bucket datadashboard-backend --output-template-file cfn/packaged.yaml
aws cloudformation deploy --template-file cfn/packaged.yaml --stack-name datadashboard --capabilities CAPABILITY_IAM
popd > /dev/null
aws s3 sync build/ s3://dashboard.transitmatters.org
