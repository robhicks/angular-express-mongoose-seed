# Angular Express Mongoose Seed

This is based on Brian Ford's Angular Express seed. Angular Express seed is based upon what appears to be the latest
stable release of Angular. In comparison and contrast, this project includes the next release candidate from the unstable
branch of Angular.

This project also includes:

SERVER
----------------------------------
Express - 3.4.0
Jade - 0.35.0
Less-Middleware - 0.1.12
Mongoose - 3.6.20
Connect Mongo - 0.3.3

CLIENT
----------------------------------
Angular - 1.2.0-rc.2
Strapless - 3.0.0 - less files from Bootstrap 3
Angular-Resource - 1.2.0-rc.2
Angular-UI-Router - 0.2.0

As identified above, this project features AngularJS on the front end, and Express + Node + Mongoose on the back end. This project is an
application skeleton for a typical [AngularJS](http://angularjs.org/) web app for those who want
to use Node to serve their app.

It also includes Jade and Less-Middleware. Jade is used to prepare templates for Angular. In other words, Jade
is not being used to inject Javascript or provide interpolation.

Less-Middleware is used to compile less stylesheets on the server. It forces compilation when Node is in development
mode. Otherwise, it compiles spreadsheets only the first time. It also incorporates the Bootstrap 3.0.0 less files and hooks
them into the less compile process in a fashion that you can choose what files to incorporate.

This seed app shows how to wire together Angular client-side components with Express on the server.
It also illustrates writing angular partials/views with the Jade templating library.

The seed also shows how to use angular-ui-router, a state router for Angular.

The seed also shows how to use ngResource to access REST services and features a simple backend REST service.

## How to use angular-express-mongoose-seed

* Install Node and NPM - http://nodejs.org/
* Install Bower - http://bower.io/
* Either install Mongodb or change dbUri an dbName (in server.js) to point to a Mongodb database.

Then, clone the angular-express-seed repository, run `npm install` to grab the dependencies, run 'bower install' and start hacking!

### Running the app

Runs almost like a typical express app:

    node server.js

### Receiving updates from upstream

Just fetch the changes and merge them into your project with git. After an update, run npm update and bower update to
update the packages used by the seed.

## Directory Layout

    node_modules            --> NodeJS modules - install using npm install
    server.js               --> app config
    public/                 --> all of the files to be used in on the client side
        bower_components    --> for bower components - install using bower install
        css/                --> css files
            fonts/          --> web font files
            app.css         --> default stylesheet
            app.less        --> less files used to compile app.css
            img/            --> image files
        js/                 --> app javascript files
            app.js          --> declare top-level app module
            controllers.js  --> application controllers
            directives.js   --> custom angular directives
            filters.js      --> custom angular filters
            services.js     --> custom angular services
    server/                 --> server files
        models/             --> Mongoose models
        routes/
            api.js          --> route for serving JSON
            index.js        --> route for serving HTML pages and partials
        views/
            index.jade      --> main page for app
            partials/       --> angular view partials (partial jade templates)
    .bowerrc                --> bower configuration file
    .gitignore
    bower.json              --> for bower
    package.json            --> for npm
    README.md               --> This readme

## Contact

For more information on

* NodeJS - http://nodejs.org
* Express - http://expressjs.com/
* Jade - http://jade-lang.com/
* Less - http://lesscss.org
* Mongoose - http://mongoosejs.com/
* AngularJS - http://angularjs.org/
* Bootstrap - http://getbootstrap.com
* Angular-UI-Router - https://github.com/angular-ui/ui-router/wiki
* Strapless - https://github.com/caitp/strapless

## License
MIT
