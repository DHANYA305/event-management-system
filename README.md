

## Client Dashboard – Event Approval System

A full-stack web application that manages event submissions through a structured approval workflow.
Events submitted by providers are reviewed by an admin and only approved events are visible to clients.

---

## Features

* Provider can submit events (pending state)
* Admin can approve or reject events
* Clients can view **approved upcoming events only**
* Search and date-based filtering
* Persistent server-side storage

---

## Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express
* Storage: JSON-based datastore
* Deployment: Render (optional)

---

## Application Flow

```
Provider submits event
        ↓
Event stored as "pending"
        ↓
Admin reviews & approves/rejects
        ↓
Approved events shown to clients
```

---

## How to Run Locally

1. Clone the repository
2. Install dependencies: `npm install`
3. Start server: `node server.js`
4. Open: `http://localhost:5002/admin.html`

---

## Hackathon Context
This project was originally developed during a hackathon and later refactored into a stable full-stack application for internship and learning purposes.

