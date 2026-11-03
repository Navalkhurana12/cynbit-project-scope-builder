# Technical Report — Cynbit Smart Project Scope Builder

**Applicant:** Naval Khurana  
**Role:** Full Stack Developer Intern  
**Project:** Cynbit Smart Project Scope Builder  
**Submission date:** 4 November 2026

> This is an independent prototype proposal for the assessment. It does not modify or integrate with Cynbit's production website and is not an official Cynbit product.

## 1. Executive summary

This prototype introduces a guided project-discovery flow for prospective customers exploring Cynbit's technology services. It collects a customer's selected service, business problem, desired capabilities, budget, timeline and contact details. The application then generates a structured project brief containing a summary, suggested modules, indicative technology options, a complexity label and recommended next steps.

## 2. Website analysis

### User perspective

Cynbit presents several technical service areas, including AI automation, software development, cloud solutions and digital marketing. A prospective customer may know the business problem they want to solve without knowing the technical terminology or which service category best fits. A guided discovery experience is a potential way to reduce this uncertainty and help the customer communicate a clearer initial brief.

### Developer perspective

A structured project enquiry can be represented as validated data rather than a single unstructured message. A backend endpoint can validate the input, generate a consistent brief and persist it for later review. This creates a clear separation between the React user interface, Express API, validation/business logic and MongoDB data layer.

### Evidence and limitations

The project scope is a proposed UX opportunity inferred from the service range and contact journey, not a claim that Cynbit has confirmed customer complaints or a measured conversion problem. Any production audit should separately verify page performance, accessibility, metadata and form behaviour using browser testing and appropriate audit tools. The Open Graph checker warnings shared during the assessment discussion can be included as a separate SEO observation only after re-running the checker against the exact live URL and saving dated evidence.

## 3. Problem statement

Prospective customers may find it difficult to translate a business challenge into a clear technical project request. A generic enquiry can omit important context such as desired capabilities, budget and expected timeline, creating avoidable clarification during early discovery.

## 4. Proposed solution

Build a four-step Project Scope Builder:

1. Select a service category.
2. Describe the business problem and choose relevant capabilities.
3. Specify budget and expected timeline.
4. Provide contact details and generate the project blueprint.

The generated blueprint includes a project summary, suggested modules, indicative technology options, a complexity label and recommended next steps.

## 5. Technology stack

| Technology | Responsibility |
|---|---|
| React + Vite | Interactive, responsive frontend |
| CSS | Responsive visual design |
| Node.js + Express | REST API and request handling |
| Zod | Server-side input validation |
| MongoDB + Mongoose | Persistent project brief storage |
| Helmet, CORS, express-rate-limit | Basic API hardening |

## 6. Architecture

Browser (React) → Express REST API → Zod validation → deterministic blueprint generator → MongoDB (when configured).

The local demo supports temporary in-memory submissions when MongoDB is not configured. This is only for development demonstration; data is lost when the server restarts.

## 7. API design

| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | Reports API and database/demo status |
| POST | `/api/projects` | Validates input, generates a blueprint and saves/returns it |
| GET | `/api/projects/:id` | Retrieves a stored or demo project brief |

## 8. Expected results

- A visitor can complete a guided project discovery flow.
- Invalid or incomplete input is rejected by the API.
- The app returns a consistent project blueprint.
- Project briefs persist in MongoDB when a valid connection is configured.
- The prototype provides a practical demonstration of frontend, backend, API and database integration.

No conversion-rate or business-impact improvement is claimed because the prototype has not been tested with real Cynbit customers or production analytics.

## 9. Testing checklist

- [ ] API health endpoint returns HTTP 200.
- [ ] Each service can be selected.
- [ ] Required fields and email format are validated.
- [ ] A valid submission returns a project blueprint.
- [ ] MongoDB mode stores and retrieves a project.
- [ ] Demo mode clearly warns that data is temporary.
- [ ] Copy and download actions work.
- [ ] Layout works on desktop and mobile widths.
- [ ] Invalid API requests return HTTP 400.

## 10. Future improvements

- Add authenticated internal access for a project enquiry dashboard.
- Add email notifications with explicit consent and verified delivery.
- Add configurable service templates maintained by the company.
- Add automated tests, structured logs and production monitoring.
- Conduct usability testing and compare enquiry completeness before and after launch.

## 11. Conclusion

The Smart Project Scope Builder is a focused, independently deployable prototype that addresses a plausible gap in the early project-discovery journey. It demonstrates a complete full-stack workflow while keeping generated recommendations clearly indicative rather than presenting them as a formal estimate or commitment.
