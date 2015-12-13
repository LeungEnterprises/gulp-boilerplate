# Gulp Boilerplate [![Build Status](https://travis-ci.org/LeungEnterprises/gulp-boilerplate.svg?branch=master)](https://travis-ci.org/LeungEnterprises/gulp-boilerplate)
Boilerplate for making a static site using Gulp.

## Instructions
`git clone https://github.com/LeungEnterprises/gulp-boilerplate`

`cd gulp-boilerplate`

`npm install && bower install`

`gulp dev`

## Deploy
Edit your details in the `deploy.sh` (`git config` etc.) script and then activate the repository on Travis.

Install the Travis CLI (`gem install travis`) and then [encrypt](https://docs.travis-ci.com/user/encryption-keys/) and add your generated [GitHub token](https://github.com/settings/tokens) via `travis encrypt GH_TOKEN=<token> --add`.

Script based on https://gist.github.com/domenic/ec8b0fc8ab45f39403dd

## Examples
* https://bistro.nathanhleung.com/

## License
MIT
