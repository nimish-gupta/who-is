import fetch from 'node-fetch';
import { SLACK_DATA_URL } from './constants';

interface IFetchIntro {
	success: boolean;
	msg: string;
}

interface ISlackResponse {
	data: {
		intros: Array<{
			text: string;
		}>;
	};
}

const fetchIntro = async (clientId: string): Promise<IFetchIntro> => {
	try {
		const query = `
  query {
    intros(where: {user_id: {_eq: "${clientId}"}}, order_by:{ ts: asc }) {
      text
      ts
    }
	}`;

		const response = await fetch(SLACK_DATA_URL, {
			method: 'POST',
			body: JSON.stringify({ query }),
			headers: {
				'X-Hasura-Role': `bot`,
			},
		});
		const {
			data: { intros },
		} = (await response.json()) as ISlackResponse;

		if (intros.length === 0) {
			return { success: false, msg: 'Sorry intro not found for the user ' };
		}

		const text = intros.map((intro) => intro.text).join('\n');

		return { success: true, msg: text };
	} catch (error) {
		return { success: false, msg: error.message };
	}
};

export default fetchIntro;
