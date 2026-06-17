import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.PROD ? '/' : 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  withCredentials: true,
});
