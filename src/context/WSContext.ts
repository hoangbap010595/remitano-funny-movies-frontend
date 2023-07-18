import { createContext } from "react";
import { io, Socket } from "socket.io-client";

const { REACT_APP_WEBSOCKET_URL } = process.env;
const WS_URI = REACT_APP_WEBSOCKET_URL || "";

export const socket = io(WS_URI, { transports: ["websocket"] });
export const WebSocketContext = createContext<Socket>(socket);
export const WebSocketProvider = WebSocketContext.Provider;
