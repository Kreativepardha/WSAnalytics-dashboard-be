// import axios from 'axios';

// const API = 'http://localhost:3000/api/events';

// const events = [
//   {
//     type: 'pageview',
//     page: '/home',
//     sessionId: 'user-1',
//     timestamp: new Date().toISOString(),
//     country: 'India',
//     metadata: { device: 'mobile', referrer: 'google.com' },
//   },
//   {
//     type: 'pageview',
//     page: '/products',
//     sessionId: 'user-1',
//     timestamp: new Date(Date.now() + 10000).toISOString(),
//     country: 'India',
//   },
//   {
//     type: 'click',
//     page: '/products',
//     sessionId: 'user-2',
//     timestamp: new Date().toISOString(),
//     country: 'USA',
//   },
// ];

// (async () => {
//   for (const e of events) {
//     await axios.post(API, e);
//     console.log('Sent', e);
//   }
// })();
