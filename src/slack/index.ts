import fetch from 'node-fetch';

import fetchIntro from '../fetchIntro';

const getSlackClientId = (text: string): string => {
	const match = text.match(/<@(.*?)\|/);
	if (match === null || match.length < 1) {
		throw new Error('Could not fetch the username');
	}
	return match[1];
};

const sendErrorMessage = (msg: string) => `> **Error: ${msg}**`;

export interface ISlackRequest {
	token: string;
	team_id: string;
	team_domain: string;
	channel_id: string;
	channel_name: string;
	user_id: string;
	user_name: string;
	command: string;
	text: string;
	response_url: string;
}

export const sendSlackResponse = async (
	body: ISlackRequest
): Promise<boolean> => {
	let text = 'User not found';
	try {
		const clientId = getSlackClientId(body.text);
		const response = await fetchIntro(clientId);

		text = response.success
			? `\`\`\` ${response.msg} \`\`\``
			: sendErrorMessage(response.msg);
	} catch (error) {
		text = sendErrorMessage(error.message);
	}

	await fetch(body.response_url, {
		method: 'POST',
		body: JSON.stringify({ text }),
	});

	return true;
};

export default sendSlackResponse;
