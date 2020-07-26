import express from 'express';

const server = async (port: string): Promise<true> => {
	const app = express();

	app.post('/slack/whois', (req, res) => {
		console.log(req);
		res.json({
			status: 200,
			message: true,
		});
	});
	return new Promise((res) => {
		app.listen(port, () => {
			console.log(`Application has started on https://localhost:${port}`);
			res(true);
		});
	});
};

export default server;
