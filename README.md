# electron-osx-calculator

> This is my first Electron app, i just wanted to get my hands on with a very simple app
> I created a simple OSX-like calculator

## Stack
- Electron
- Angular
- Express (for debugging and testing purposes)

## Install
- clone repo
- cd path/to/repo
- npm install
- bower install
- cd src/
- npm install # install node_modules of the app itself

## Run
- cd /root/of/repo
- npm start # launches the calculator

## Develope/Debug
- vim index.js
- set DevelopmentMode = true
- npm start

## Package
- npm run package # see full script inside ./package.json -> scripts section
- this should generate packages for Linux/OSX/Darwin to the root of the repo
- you should be able to run the app from binaries as following
  - ./OSX-Calc-linux-x64/OSC-Calc