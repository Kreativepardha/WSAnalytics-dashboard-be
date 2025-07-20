type SessionInfo = {
  journey: string[];
  startedAt: Date;
};
export const WebSocketServerInstance = {
  emitVisitorUpdate: (event: any) => { /*...*/ },
  emitSessionActivity: (sessionId: string, session: SessionInfo | undefined) => { /*...*/ }
};


let totalDashboards = 0;
const sessions = new Map<string, SessionInfo>();

export const initWebSocketServer = () => {
  Bun.serve({
    port: 3001,
    fetch(req, server) {
      if (server.upgrade(req)) return;
      return new Response("Not a WebSocket connection", { status: 400 });
    },
    websocket: {
      open(ws) {
        totalDashboards++;
        ws.send(JSON.stringify({
          type: 'user_connected',
          data: {
            totalDashboards,
            connectedAt: new Date().toISOString(),
          },
        }));
        console.log(`Dashboard connected`);
      },
      message(ws, message) {
        try {
          const { type, payload } = JSON.parse(message.toString());

          if (type === 'request_detailed_stats') {
            console.log('Received request_detailed_stats', payload);
          }

          if (type === 'track_dashboard_action') {
            console.log('Dashboard Action', payload);
          }
        } catch (err) {
          console.error('Invalid message:', message);
        }
      },
      close(ws) {
        totalDashboards--;
        ws.send(JSON.stringify({
          type: 'user_disconnected',
          data: {
            totalDashboards,
          },
        }));
        console.log(`Dashboard disconnected`);
      },
    },
  });

  console.log('✅ WebSocket server initialized at ws://localhost:3001');
};
