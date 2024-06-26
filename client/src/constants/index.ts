export const API_URI = process.env.API_URI!
export const COOKIE_NAME = process.env.COOKIE_NAME!
export const API_CREATE_CLIENT_RESERVATION_URL = `/reservation/create`;
export const API_CREATE_SERVER_RESERVATION_URL = API_URI + API_CREATE_CLIENT_RESERVATION_URL;
export const API_CANCEL_CLIENT_RESERVATION_URL = '/reservation/cancel';
export const API_CANCEL_SERVER_RESERVATION_URL = API_URI + API_CANCEL_CLIENT_RESERVATION_URL;
