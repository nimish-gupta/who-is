import { Handler } from 'aws-lambda';
import queryString from 'query-string';
import sendSlackResponse, { ISlackRequest } from './slack';

export const slackWhoIs: Handler = async (event) => {
	const body = (queryString.parse(event.body) as unknown) as ISlackRequest;
	const text = await sendSlackResponse(body);
	return {
		statusCode: 200,
		body: JSON.stringify({ text }),
	};
};
