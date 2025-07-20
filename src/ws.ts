import uWS from 'uWebSockets.js';

uWS.App()
  .ws('/*', {
    open: (ws) => {
      console.log('✅ WebSocket connected');
      ws.send('Connected to WS');
    },
    message: (ws, msg) => {
      ws.send('Echo: ' + Buffer.from(msg).toString());
    },
  })
  .listen(3000, (token) => {
    if (token) console.log('🚀 WS on ws://localhost:3000');
    else console.log('❌ WebSocket server failed');
  });
