import { useContext } from 'react'
import { WebSocketContext } from '../context/WSContext';

export const useWS = () => useContext(WebSocketContext);