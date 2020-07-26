import server from './server';
import { PORT } from './constants';

const main = async (): Promise<true> => {
	return await server(PORT);
};

main();
