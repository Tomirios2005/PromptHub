# PromptHub

A REST API + React frontend that compares responses from multiple LLM models to the same prompt simultaneously.

## Features
- Send a prompt and get responses from 6 different models in parallel
- Markdown rendering for formatted responses
- Response time per model
- Automatic deduplication of repeated prompts
- AI-powered rating and analysis of each response *(coming soon)*

## Tech Stack
**Backend:** Java 21, Spring Boot 4, MySQL, Spring Data JPA, Groq AI  
**Frontend:** React, TypeScript, Tailwind CSS, Vite

## Models compared
- llama-3.1-8b-instant
- llama-3.3-70b-versatile
- openai/gpt-oss-120b
- openai/gpt-oss-20b
- groq/compound
- groq/compound-mini

## Setup
1. Clone the repo
2. Configure `application.properties` with your MySQL credentials and Groq API key
3. Run the Spring Boot backend
4. `cd frontend && npm install && npm run dev`