BartCommute
===========

Provides relevant up the minute schedule information to regular BART commuters.

### Use Case

I travel the same route every day on BART, but due to BART delays or my schedule inconsistency I don't always know which train I'm going to end up on or what time I'm going to arrive. 

BART has a great trip planner feature, but this app will guess where I am and provide concise and relevant information without asking me to fill out a form or push any buttons.

### Deployment

Prerequisites:

* [Node](http://nodejs.org/)
* [npm](https://www.npmjs.org/)

To host your own version of this app make sure you have the prerequisites covered and follow these steps:

1. Clone the repo to the desired location `git clone https://github.com/mishabosin/BartCommute.git`
2. Access the repository `cd BartCommute`
3. Install the dependencies `npm install`
4. Start the server `npm start`

### Technical Details

**BartCommute** is a web app running on Node.js. This is the first node app that I've actually attempted to deploy, and I hope to learn a lot from the process. It currently uses a super light-weight [Express](http://expressjs.com/) server and hosts single page htlm app that relies on [jQuery](http://jquery.com/), [AngularJs](https://angularjs.org/), and [Bootstrap](http://getbootstrap.com/).

I'm intentionally using only the lightest features of AngularJs, so that I can easily try out other front-end MVC frameworks such as Backbone.js or Knockout.js, and I hope to make a version using each very soon.

The user data is currently stored in the client using localStorage, and it will probably stay there unless there's a reason to ask users to create an account to use the app.

**BartCommute** uses [BART API](http://api.bart.gov/docs/overview/index.aspx) to get all station data and up-to-the-minute schedule data.

