export const WEBSOCKET_CONFIG = {
  WSS: `wss://${process.env.NEXT_PUBLIC_WS_HOST}`,
  API: process.env.NEXT_PUBLIC_WS_API_URL ?? "",
} as const;
