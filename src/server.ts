import express from 'express';
import bodyParser from 'body-parser';
import sendSlackResponse, { ISlackRequest } from './slack';

const server = async (port: string): Promise<true> => {
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

	return new Promise((res) => {
		app.listen(port, () => {
			console.log(`Application has started on https://localhost:${port}`);
			res(true);
		});
	});
};

export default server;
