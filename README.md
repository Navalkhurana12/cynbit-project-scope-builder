# Cynbit Smart Project Scope Builder

An independent full-stack prototype for the Cynbit website improvement assessment. It helps a prospective customer turn a business idea into a structured project brief.

> This is an independent prototype concept, not an official Cynbit product and not connected to Cynbit's production systems.

## Problem and proposed improvement

A prospective customer may understand their business problem but not know which technical service or requirements to communicate. The guided builder collects the service, problem, desired capabilities, budget, timeline and contact details, then generates a structured project blueprint. This is a proposed UX opportunity based on the range of technical services presented on Cynbit's public website; it is not a claim that customers have reported this problem.

## Features

- Four-step guided project discovery flow
- Service-specific feature suggestions
- Client-side and server-side validation
- Deterministic project blueprint generation (no paid AI API required)
- Suggested modules, technology options, complexity and next steps
- Save project briefs to MongoDB when configured
- Local demo-memory mode when MongoDB is not configured
- Copy and download project blueprint
- Responsive interface
- Express security headers, request-size limit and API rate limiting

## Tech stack

- Frontend: React 18, Vite, custom responsive CSS, Lucide icons
- Backend: Node.js, Express
- Database: MongoDB Atlas with Mongoose
- Validation: Zod

## Requirements

- Node.js 20 or later (recommended)
- npm
- MongoDB Atlas account for persistent storage (optional for local UI/API demo)

## Run locally on Windows PowerShell

Open PowerShell in the project root:

```powershell
npm install
npm install --prefix server
npm install --prefix client
Copy-Item server/.env.example server/.env
Copy-Item client/.env.example client/.env
```

If you have MongoDB Atlas, edit `server/.env` and set `MONGO_URI` to your connection string. Ensure the database user's password is URL-encoded if it contains special characters. For a local demonstration without MongoDB, leave `MONGO_URI` empty; submissions will work in temporary memory and disappear when the server restarts.

Start both applications from the root:

```powershell
npm run dev
```

Open `http://localhost:5173`. Backend health check: `http://localhost:5000/api/health`.

Alternatively, run each in its own terminal:

```powershell
npm run dev --prefix server
npm run dev --prefix client
```

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API and database status |
| POST | `/api/projects` | Validate, generate and save a project brief |
| GET | `/api/projects/:id` | Retrieve a saved/demo project brief |

### Example request body

```json
{
  "contact": { "name": "Alex Example", "email": "alex@example.com", "company": "Example Co" },
  "service": "AI Automation",
  "problem": "We manually respond to repetitive customer questions and want to automate first-line support.",
  "features": ["AI chatbot", "CRM integration"],
  "budget": "₹50,000 – ₹2 lakh",
  "timeline": "1–3 months"
}
```

## Production deployment

### Backend (Render)

1. Push the repository to GitHub.
2. Create a Render Web Service from the repository.
3. Set the root directory to `server`.
4. Build command: `npm install`.
5. Start command: `npm start`.
6. Add environment variables: `MONGO_URI`, `CLIENT_ORIGIN` (your deployed frontend URL), and `PORT` if required by the host.

### Frontend (Vercel)

1. Import the GitHub repository into Vercel.
2. Set root directory to `client`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add `VITE_API_URL` with the deployed backend base URL (no trailing slash).
6. Redeploy after setting the environment variable.

For MongoDB Atlas, create a database user and restrict network access appropriately. Never commit `.env` files or credentials.

## Important production considerations

- Demo-memory mode is temporary and is intended only for local evaluation.
- Add consent/privacy wording and a privacy policy before collecting real customer information.
- Add authentication and authorization before building an admin interface.
- Configure strict CORS to the deployed frontend domain.
- Review suggested technologies and complexity with a developer; generated output is a starting brief, not a binding estimate or quote.
- Add automated tests and logging before production use.

## Assessment note

The prototype is independent and illustrative. It does not modify Cynbit's production website, submit data to Cynbit, or represent an official Cynbit service. The improvement should be described as a proposed customer-experience enhancement.
