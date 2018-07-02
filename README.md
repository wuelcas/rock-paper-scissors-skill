# rock-paper-scissors

### Development Setup

* Install and use Node v4.3.2
* Run `npm install`
* Edit `config/local.json` with all of the requisite fields.

`npm install` will install the project dependencies
`npm run watch` will start the server and watch for changes.


### Directory Structure

	`config/` -> Environment variables or configuration
	`services/` -> API clients, Authentications and Extras
	`skill/` -> Amazon Echo Skill login, the state machine and flow
	`speechAssets/` -> Amazon Echo Utterances, Intent Schema and Custom Slots.
	`tests/` -> Unit Tests
	`server.js` -> Development server.
	`gulpfile.js` -> Gulp tasks
	`serverless.yml` -> Serverless configuration
	`package.json` -> Dependencies
	`README.md`


