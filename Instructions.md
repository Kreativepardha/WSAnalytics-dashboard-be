
# API Developer Intern - Technical

# Assessment

**Deadline:** July 20th, 2025 - 11:59 PM IST
**Submission:** Screen Recording (3-10 minutes)
**Environment:** Everything runs locally - NO deployment required

## Project: Real-Time Visitor Analytics System

### Understanding the Project

**What you're building:** A system that tracks website visitors and shows live updates on a
dashboard using WebSocket for real-time communication.
**Three Main Components:**

1. **API Server** - Receives visitor data from websites
2. **WebSocket Server** - Handles real-time bidirectional communication
3. **Dashboard** - Shows live visitor information and interacts with server

## Detailed Requirements

### 1. Backend API Server (Node.js + Express.js)

**Required REST Endpoints:
POST /api/events
Receives visitor events:**
javascript
{
"type": "pageview", _// "pageview", "click", or "session_end"_
"page": "/products",
"sessionId": "user-123",
"timestamp": "2025-07-19T10:30:00Z",


"country": "India",
"metadata": { _// Optional extra data_
"device": "mobile",
"referrer": "google.com"
}
}
**GET /api/analytics/summary
Returns current statistics
GET /api/analytics/sessions
Returns active sessions with their journey**

### 2. WebSocket Events (The Core Focus)

**Server ¿ Client Events:
visitor_update**
When a new visitor event arrives:
javascript
{
"type": "visitor_update",
"data": {
"event": { _/* the visitor event */_ },
"stats": {
"totalActive": 5 ,
"totalToday": 150 ,
"pagesVisited": { "/home": 45 , "/products": 30 }
}
}
}
**user_connected**
When a new dashboard connects:
javascript
{
"type": "user_connected",
"data": {


"totalDashboards": 3 ,
"connectedAt": "2025-07-19T10:30:00Z"
}
}
**user_disconnected**
When a dashboard disconnects:
javascript
{
"type": "user_disconnected",
"data": {
"totalDashboards": 2
}
}
**session_activity**
Real-time session tracking:
javascript
{
"type": "session_activity",
"data": {
"sessionId": "user-123",
"currentPage": "/products",
"journey": ["/home", "/products"],
"duration": 45 _// seconds on site_
}
}
**alert**
Server-initiated alerts:
javascript
{
"type": "alert",
"data": {
"level": "info", _// "info", "warning", "milestone"_
"message": "New visitor spike detected!",
"details": {


"visitorsLastMinute": 25
}
}
}
**Client ¿ Server Events:
request_detailed_stats**
Dashboard requests detailed analytics:
javascript
{
"type": "request_detailed_stats",
"filter": {
"country": "India", _// Optional filters_
"page": "/products"
}
}
**track_dashboard_action**
Track what dashboard users are doing:
javascript
{
"type": "track_dashboard_action",
"action": "filter_applied",
"details": {
"filterType": "country",
"value": "India"
}
}

### 3. Analytics Dashboard

**Must Include:**

**1. Real-Time Displays:**
    ¿ Connection status indicator
    ¿ Active visitors counter (with live updates)
    ¿ Total visitors today


```
¿ Live visitor feed (newest first)
¿ Active sessions with their current page
¿ Mini chart showing visitors over last 10 minutes
```
**2. Interactive Features:**
    ¿ Filter events by country/page (sends WebSocket message)
    ¿ Click on a session to see visitor journey
    ¿ Clear/reset statistics button
    ¿ Sound/visual notification for new visitors (optional)
**3. WebSocket Status:**
    ¿ Show "Connected" / "Reconnecting" / "Disconnected"
    ¿ Display number of other dashboards connected
    ¿ Auto-reconnect if connection drops

## What to Show in Your Video (3-10 minutes)

### Part 1: Quick Overview (1 minute)

```
¿ Show project structure
¿ Briefly explain WebSocket event types
```
### Part 2: Live Demo (2-9 minutes)

**Step 1: Start Server & Open Dashboard**
¿ Start server
¿ Open dashboard
¿ Show WebSocket connection established
**Step 2: Simulate Visitor Activity** Send these events via Postman:
**First visitor starts browsing:**
json
{
"type": "pageview",
"page": "/home",
"sessionId": "visitor-001",
"timestamp": "2025-07-19T10:30:00Z",
"country": "India"


#### }

**Show:** Dashboard updates with new visitor
**Same visitor navigates:**
json
{
"type": "pageview",
"page": "/products",
"sessionId": "visitor-001",
"timestamp": "2025-07-19T10:30:30Z",
"country": "India"
}
**Show:** Session journey updates in real-time
**Step 3: Multiple Dashboards**
¿ Open second dashboard in new tab
¿ **Show:** "user_connected" event in first dashboard
¿ Send new visitor event
¿ **Show:** Both dashboards update
**Step 4: Interactive Features**
¿ Click filter by country in dashboard
¿ **Show:** WebSocket sends request to server
¿ **Show:** Filtered results appear
**Step 5: Session Tracking**
¿ Send multiple events for different sessions
¿ **Show:** Active sessions list with current pages
¿ Click on a session
¿ **Show:** Full visitor journey
**Step 6: Disconnect Scenario**
¿ Stop the server
¿ **Show:** Dashboard shows "Disconnected"
¿ Restart server
¿ **Show:** Dashboard auto-reconnects


## How to Showcase Multiple Dashboards (Best Approach)

### Recommended Method: Browser Tabs with Tab Switching

**Setup:**

1. **Tab 1:** Dashboard 1 - [http://localhost:3000/dashboard.html](http://localhost:3000/dashboard.html)
2. **Tab 2:** Dashboard 2 - [http://localhost:3000/dashboard.html](http://localhost:3000/dashboard.html)
3. **Tab 3:** Postman (for sending events)
**In Your Recording:
Step 1: Show First Dashboard**
¿ Open Chrome/Firefox
¿ Navigate to dashboard
¿ Say: "Here's our first dashboard connected to the WebSocket server"
¿ Point out: "Notice it shows 1 connected dashboard"
**Step 2: Open Second Dashboard**
¿ Open new tab (Ctrl+T)
¿ Navigate to same dashboard URL
¿ Say: "Now I'll open a second dashboard instance"
¿ Switch to Tab 1
¿ Say: "Notice the first dashboard now shows 2 connected dashboards"
**Step 3: Demonstrate Real-Time Updates**
¿ Switch to Postman tab
¿ Say: "Now I'll send a visitor event"
¿ Send the POST request
¿ Quickly switch to Tab 1: "Dashboard 1 received the update"
¿ Switch to Tab 2: "Dashboard 2 also received it simultaneously"
**Step 4: Show WebSocket Communication**
¿ In one dashboard, apply a filter
¿ Switch to browser DevTools (F12)
¿ Go to Network ¿ WS tab
¿ Say: "Here you can see the WebSocket messages being exchanged"

## Evaluation Focus


1. **WebSocket Implementation** - Proper event handling both ways
2. **Real-time Updates** - Smooth, instant updates
3. **Session Tracking** - Visitor journey tracking
4. **Interactive Features** - Two-way communication
5. **Connection Management** - Handles disconnects gracefully

## Submission

1. Build locally (no deployment needed)
2. Test all WebSocket events thoroughly
3. Record 3-10 minute video demonstration
**Remember:** Focus on showing smooth real-time updates and proper WebSocket
communication in both directions!


