# Express Product API with Caching

A simple Express.js REST API built as part of a caching workshop.

The project demonstrates how to build a layered backend architecture with:

- In-memory caching
- Cache HIT/MISS headers
- Time To Live (TTL)
- Cache expiration
- Cache invalidation after data modifications
- CRUD operations
- Middleware-based caching
- Separation of routes, controllers, services, and database logic

---

## 🏗️ Architecture

The application follows a layered request flow:

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Database
