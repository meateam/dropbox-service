import { connectMongo } from './utils/connectMongo';
import { Server } from './server';
import { config } from './config';


(async () => {
    const server: Server = new Server(config.server.bindAddress);
    await connectMongo(server);
    server.server.start();
})();