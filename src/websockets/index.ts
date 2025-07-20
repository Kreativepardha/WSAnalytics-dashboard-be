import { getFilteredStats, emitStatsUpdate } from '../services/analytics.services';

type SessionInfo = {
  journey: string[];
  startedAt: Date;
};

let totalDashboards = 0;
const sessions = new Map<string, SessionInfo>();
let wsServer: any = null;

export const WebSocketServerInstance = {
  emitVisitorUpdate: (event: any) => {
    if (wsServer) {
      const message = JSON.stringify({
        type: 'visitor_update',
        data: {
          event,
          stats: {
            totalActive: sessions.size,
            totalToday: 0 // This will be updated from analytics service
          }
        }
      });
      
      // Broadcast to all connected dashboards
      wsServer.publish('dashboard', message);
    }
  },
  emitSessionActivity: (sessionId: string, session: SessionInfo | undefined) => {
    if (wsServer && session) {
      const message = JSON.stringify({
        type: 'session_activity',
        data: {
          sessionId,
          journey: session.journey,
          duration: Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 1000)
        }
      });
      
      wsServer.publish('dashboard', message);
    }
  }
};

export const initWebSocketServer = () => {
  wsServer = Bun.serve({
    port: 3001,
    fetch(req, server) {
      if (server.upgrade(req)) return;
      return new Response("Not a WebSocket connection", { status: 400 });
    },
    websocket: {
      open(ws) {
        totalDashboards++;
        ws.subscribe('dashboard');
        
        ws.send(JSON.stringify({
          type: 'user_connected',
          data: {
            totalDashboards,
            connectedAt: new Date().toISOString(),
          },
        }));
        console.log(`Dashboard connected. Total: ${totalDashboards}`);
        
        // Send initial stats
        emitStatsUpdate();
      },
      message(ws, message) {
        try {
          const { type, payload } = JSON.parse(message.toString());

          if (type === 'request_detailed_stats') {
            console.log('Received request_detailed_stats', payload);
            
            // Handle filtered stats request
            getFilteredStats(payload.filter || {}).then(filteredData => {
              ws.send(JSON.stringify({
                type: 'filtered_stats',
                data: filteredData
              }));
            }).catch(error => {
              console.error('Error getting filtered stats:', error);
            });
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
        ws.unsubscribe('dashboard');
        
        ws.send(JSON.stringify({
          type: 'user_disconnected',
          data: {
            totalDashboards,
          },
        }));
        console.log(`Dashboard disconnected. Total: ${totalDashboards}`);
      },
    },
  });

  console.log('✅ WebSocket server initialized at ws://localhost:3001');
};
