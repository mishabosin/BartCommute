BartCommute
===========

[BartCommute](http://bart-commuter.herokuapp.com/) provides relevant up the minute schedule information to regular BART commuters. 

### Use Case

I travel the same route every day on BART, but due to BART delays or my schedule inconsistency I don't always know which train I'm going to end up on or what time I'm going to arrive. 

BART has a great trip planner feature, but this app will guess where I am and provide concise and relevant information without asking me to fill out a form or push any buttons.

### Technical Details

**BartCommute** is a web app running on Node.js hosted by Heroku. This is my first node app that has actually seen the light of day, and it is my first time deploying anything using Heroku. (Both have been amazing to work with!) The app currently uses a super light-weight [Express](http://expressjs.com/) server and hosts a single page htlm app that relies on [jQuery](http://jquery.com/), [AngularJs](https://angularjs.org/), and [Bootstrap](http://getbootstrap.com/).

I'm intentionally using only the lightest features of AngularJs (basically just used for data-binding), and I'd like to rewrite the client to use other front-end MVC frameworks such as Backbone.js or Knockout.js. 

The user data is currently stored in the client using localStorage, and it will probably stay there unless there's a reason to ask users to create an account to use the app.

**BartCommute** uses the [BART API](http://api.bart.gov/docs/overview/index.aspx) to get all station data and up-to-the-minute schedule data. It is using the [x2js](https://code.google.com/p/x2js/) library to convert the XML data provided by the BART API into json that is easily consumed by the front-end app.

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
* Pick a testing framework and add tests!
* Register the app with BART to get a unique app id for faster and more reliable API access.
* Build the client using Backbone.js
* Clean up the nav bar
* Build a commuter version of the trip planner tool
