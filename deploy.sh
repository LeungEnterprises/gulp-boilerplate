#!/bin/bash

set -e # Immediately exit on fail

rm -rf build || exit 0 # exit if this fails
rm -rf dist || exit 0 # exit if this fails

gulp build || exit 0
gulp produce || exit 0

cd dist
git init

git config user.name "Travis CI"
git config user.email "hello@leungenterprises.com"

git add .
git commit -m "Github Pages Deploy"

# This assumes you've already registered SSH keys with GitHub
git remote add origin git@github.com:LeungEnterprises/gulp-boilerplate.git # Change this to your data

git push --force --quiet origin master:gh-pages
