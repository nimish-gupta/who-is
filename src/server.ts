import express from 'express';
import bodyParser from 'body-parser';
import serverless from 'serverless-http';

import sendSlackResponse, { ISlackRequest } from './slack';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post(
	'/slack/whois',
	async (
		req: express.Request<
			Record<'a', string>,
			Record<'a', string>,
			ISlackRequest
		>,
		res
	) => {
		sendSlackResponse(req.body);
		res.status(200).send();
	}
);

module.exports.handler = serverless(app);
