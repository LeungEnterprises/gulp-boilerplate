# Gulp Boilerplate [![Build Status](https://travis-ci.org/LeungEnterprises/gulp-boilerplate.svg?branch=master)](https://travis-ci.org/LeungEnterprises/gulp-boilerplate)
Boilerplate for making a static site using Gulp.

No global deps required! (except for npm of course)

## Instructions
`git clone https://github.com/LeungEnterprises/gulp-boilerplate`

`cd gulp-boilerplate`

`npm install`

`npm run postinstall` // Installs bower components

`npm start` // Starts gulp task which compiles and watches files

`npm run server` // Starts python SimpleHTTPServer in build/ directory, listening on port 3000

`npm run gulp:produce` // Minifies, concatenates, etc.

`npm run bower:install -- bower-package --save` // if you want to install another package via bower

## Deploy
Edit your details in the `deploy.sh` (`git config` etc.) script and then activate the repository on Travis.

Install the Travis CLI (`gem install travis`) and then [encrypt](https://docs.travis-ci.com/user/encryption-keys/) and add your generated [GitHub token](https://github.com/settings/tokens) via `travis encrypt GH_TOKEN=<token> --add`.  If you get an error that says `Invalid scheme format: git@github.com` you need to remove your SSH remote and change it to HTTPS (e.g. https://github.com).

Script based on https://gist.github.com/domenic/ec8b0fc8ab45f39403dd

## Examples
* https://www.leungnenterprises.com/

## License
MIT
