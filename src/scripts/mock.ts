import { handleVisitorEvent } from '../services/events.services';

const countries = ['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France'];
const pages = ['/home', '/products', '/about', '/contact', '/pricing', '/blog', '/support'];
const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
const devices = ['Desktop', 'Mobile', 'Tablet'];

function generateRandomSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function generateRandomEvent() {
  const sessionId = generateRandomSessionId();
  const country = countries[Math.floor(Math.random() * countries.length)];
  const page = pages[Math.floor(Math.random() * pages.length)];
  const browser = browsers[Math.floor(Math.random() * browsers.length)];
  const device = devices[Math.floor(Math.random() * devices.length)];
  
  return {
    type: 'page_view',
    page,
    sessionId,
    timestamp: new Date().toISOString(),
    country,
    metadata: {
      browser,
      device,
      userAgent: `Mozilla/5.0 (${device}) ${browser}/1.0`,
      referrer: 'https://google.com',
      screenResolution: '1920x1080'
    }
  };
}

async function generateMockEvents() {
  console.log('🚀 Starting mock event generation...');
  
  // Generate initial events
  for (let i = 0; i < 5; i++) {
    const event = generateRandomEvent();
    try {
      await handleVisitorEvent(event);
      console.log(`✅ Generated event ${i + 1}: ${event.page} from ${event.country}`);
    } catch (error) {
      console.error(`❌ Error generating event ${i + 1}:`, error);
    }
    
    // Wait a bit between events
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('🎉 Mock event generation completed!');
  console.log('📊 Check your dashboard at http://localhost:3000/dashboard.html');
}

// Run the mock generator
generateMockEvents().catch(console.error);
