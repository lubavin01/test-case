export const APP_PORT = process.env.APP_PORT || '8000';
export const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL || 'mongodb+srv://nikolay_l:qwerqweruiop123@cluster0.pp51y.mongodb.net/database?retryWrites=true&w=majority';

const WS_PORT_STRING = process.env.WS_PORT || '9000';
export const WS_PORT = Number(WS_PORT_STRING);

export const SECRET = process.env.SECRET || 'superSecret';
