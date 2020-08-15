# who-is
Slack bot which will give info about the user.

Its a simple bot which will query your server for getting the info of the user. We are using [serverless](https://www.serverless.com/) and [typescript](https://www.typescriptlang.org/) for the bot.

## Get Started
```
git clone https://github.com/nimish-gupta/who-is.git && cd who-is
yarn install // For installing all the dependencies.
cp .env.example .env
```

## Running 
```
yarn start:dev
```

## Scrips
* `yarn start:dev`: It will start the application locally
* `yarn deploy:prod`: It will create the production build and will deployt it to [AWS Lambda](https://aws.amazon.com/lambda/)
* `yarn encryp:env`: It will encrypt the env variables which are used for depoyment of the application.
* `yarn decrypt:env`: It will decrypt the env variables.
* `yarn lint`: It will show all the linting errors. All the linting rules are defined in the tslint.json.
* `yarn lint:fix`: It will fix all the linting errors.
"deploy:prod": "rimraf ./build && serverless deploy --stage prod".

## Todo
* Take the get_data url as input, so that we can use this bot with any community.
* Convert this bot into slack app and store all the tokens into the db so that we can parse the contents of the slack channel and store in our format.
