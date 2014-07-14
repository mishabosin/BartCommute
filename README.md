BartCommute
===========

[BartCommute](http://bart-commuter.herokuapp.com/) provides relevant up to the minute schedule information to regular BART commuters. 

### Use Case

I travel the same route every day on BART, but due to BART delays or my schedule inconsistency I don't always know which train I'm going to end up on or what time I'm going to arrive. 

BART has a great trip planner feature, but this app will provide concise and relevant information based on my location without asking me to fill out a form or even push a button.

### Technical Details

**BartCommute** is a web app running on Node.js hosted by Heroku. This is my first node app that has actually seen the light of day, and it is my first time deploying anything using Heroku. (Both have been amazing to work with!) The app currently uses a light-weight [Express](http://expressjs.com/) server and hosts a single page htlm app that relies on [jQuery](http://jquery.com/), [AngularJs](https://angularjs.org/), and [Bootstrap](http://getbootstrap.com/).

I'm intentionally using only the lightest features of AngularJs, so that I can easily experiment with other front-end MVC frameworks such as Backbone.js or Knockout.js. 

The user data is currently stored in the client using localStorage, and it will probably stay there unless there's a reason to ask users to create an account to use the app.

**BartCommute** uses [BART API](http://api.bart.gov/docs/overview/index.aspx) to get all station data and up to the minute schedule data. It is using [x2js](https://code.google.com/p/x2js/) library to convert the XML data provided by the BART API into json so that is can be easily consumed by javascript.

All of the code was written over a weekend with lots of interruptions, so most of the technical decisions were made with the goal of making sure an app was usable before the weekend was up. It could support more than two locations, but I want to keep the user interaction trivial for now.

### Deployment

Prerequisites:

* [Node](http://nodejs.org/)
* [npm](https://www.npmjs.org/)

To host your own version of this app make sure you have the prerequisites covered and follow these steps:

1. Clone the repo to the desired location `git clone https://github.com/mishabosin/BartCommute.git`
2. Access the repository `cd BartCommute`
3. Install the dependencies `npm install`
4. Start the server `npm start`

### TODO
* Pick a testing framework and add tests! Will start with public/services and expand from there.
* Add more character to the UI.
* Register the app with BART to get a unique app id for faster and more reliable API access.
* Build the client using Backbone.js
* Do more with node - add a notification feature that allows the user to send a text or email with arrival information to family or a colleague.
