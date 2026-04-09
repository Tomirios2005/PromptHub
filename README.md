# PromptHub

A full-stack application that sends a single prompt to **6 different LLMs simultaneously** and displays their responses side-by-side, letting you compare quality, style, and speed at a glance.

## Features

- **Multi-model comparison** — query 6 models in parallel with one prompt
- **Google OAuth2 authentication** — sign in with your Google account
- **Prompt history** — browse and revisit all your past prompts
- **Markdown rendering** — formatted code blocks, lists, and headings in responses
- **Response time tracking** — see how long each model took to respond
- **Automatic deduplication** — identical prompts are not re-queried
- **User-scoped data** — each user's prompts and responses are fully isolated

## Models Compared

| Model | Provider |
|---|---|
| `llama-3.1-8b-instant` | Groq |
| `llama-3.3-70b-versatile` | Groq |
| `openai/gpt-oss-120b` | Groq |
| `openai/gpt-oss-20b` | Groq |
| `groq/compound` | Groq |
| `groq/compound-mini` | Groq |

## Tech Stack

**Backend**
- Java 21, Spring Boot 4
- Spring Security + Google OAuth2
- JWT for session management
- Spring Data JPA + Hibernate
- PostgreSQL
- Groq AI API (for LLM calls)
- Maven

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Router
- React Markdown

**DevOps**
- Docker (multi-stage build)
- Backend deployed on Render
- Frontend deployed on Vercel

## Project Structure

```
PromptHub/
├── src/main/java/org/example/prompthub/
│   ├── Controller/        # REST endpoints
│   ├── Domain/            # JPA entities (User, Prompt, PromptResponse)
│   ├── DTO/               # Request/response DTOs
│   ├── Repository/        # JPA repositories
│   ├── Service/           # Business logic + Groq API calls
│   ├── config/            # CORS and Security config
│   └── security/          # JWT filter, OAuth2 success handler
├── src/main/resources/
│   └── application.properties
├── frontend/
│   ├── src/
│   │   ├── components/    # Header, PromptInput, ResultsGrid, etc.
│   │   ├── pages/         # Home, Login, AllPrompts
│   │   ├── context/       # AuthContext, PromptsContext
│   │   └── service/       # API client (promptService.ts)
│   ├── vite.config.ts
│   └── vercel.json
├── Dockerfile
└── pom.xml
```

## Getting Started

### Prerequisites

- Java 21+
- Node.js 18+
- PostgreSQL database
- [Groq API key](https://console.groq.com)
- Google OAuth2 credentials ([Google Cloud Console](https://console.cloud.google.com))

### Backend

1. **Clone the repo**
   ```bash
   git clone <repo-url>
   cd PromptHub
   ```

2. **Set environment variables**

   | Variable | Description |
   |---|---|
   | `DATABASE_URL` | PostgreSQL JDBC URL |
   | `DATABASE_USERNAME` | Database user |
   | `DATABASE_PASSWORD` | Database password |
   | `groq.api.key` | Groq API key |
   | `google_client` | Google OAuth2 client ID |
   | `google_secret` | Google OAuth2 client secret |
   | `jwt_token` | Secret key for signing JWTs |

3. **Run**
   ```bash
   ./mvnw spring-boot:run
   ```
   The API starts on `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```
The dev server starts on `http://localhost:5173`.

### Docker

```bash
docker build -t prompthub .
docker run -p 8080:8080 \
  -e DATABASE_URL=... \
  -e DATABASE_USERNAME=... \
  -e DATABASE_PASSWORD=... \
  -e groq.api.key=... \
  -e google_client=... \
  -e google_secret=... \
  -e jwt_token=... \
  prompthub
```

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/prompts` | Get all prompts for the current user |
| `POST` | `/api/prompts` | Submit a new prompt |
| `DELETE` | `/api/prompts/{id}` | Delete a prompt |
| `GET` | `/api/responses/{promptId}` | Get all model responses for a prompt |

Authentication is handled via JWT passed in the `Authorization: Bearer <token>` header.
