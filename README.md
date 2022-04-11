# Kanap

This is the front end and back end server for Project 5 of the Web Developer path.

## Prerequisites

You will need to have Node and `npm` installed locally on your machine.

## Back end Installation

Clone this repo. From the "back" folder of the project, run `npm install`. You
can then run the server with `node server`.
The server should run on `localhost` with default port `3000`. If the
server runs on another port for any reason, this is printed to the
console when the server starts, e.g. `Listening on port 3001`.

## Front end Installation

Clone this repo. From the "front" folder of the project, run `npm install`. This command
will install all the packages needed for the developement:

-   Webpack for bundling and minifying
-   Babel for transpiling
-   Jest for unit testing
-   Testing Library DOM, Jest-DOM and User-event for integration testing
-   Nightwatch for E2E testing

## Using the website

1. Run the server.
2. Make sure the server is listening on port 3000. If it's not the case, you may change the configuration of the frontend script, by editing the file **front/src/js/config/config.js**. You can change the `port` property to match the one used by your server. This file can also be used to change the URL of the server if you need to. Make sure to compile your code afterwards by running `npm run build` in the **front** folder.
3. Open the **index.html** file and enjoy.


## Frontend architecture
The **dist** folder contains the production files including:
- The HTML files
- The stylesheets
- The minified and bundled scripts
- The images

The **src/js** folder contains the development JavaScript files, separated into different modules.

The **src/tests** folder contains all the automated tests scripts.
