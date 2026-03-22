# Cerka – Milestones

## Milestone 1: Database Requirements

**Course:** CSC-675 – Introduction to Database Systems (Spring 2026)  
**Author:** Brandon Sanchez – bsanchez15@sfsu.edu  
**Full Document:** [Cerka_Milestone2.pdf](./Cerka_Milestone2.pdf)

---

### Project Overview

Cerka is a local services discovery and booking platform for the Redwood City, CA area. It connects customers with independent service providers (barbers, lash techs, estheticians, etc.) who currently rely on Instagram DMs and fragmented tools to run their business.

The database manages user accounts, service listings, appointment scheduling, payments, reviews, geographic service areas, and messaging.

---

### Actors

| Actor | Description |
|-------|-------------|
| **Customer** | Searches for services, books appointments, pays, leaves reviews, messages providers |
| **Service Provider** | Manages profile, services, availability, portfolio, and client communication |
| **System Administrator** | Moderates platform, reviews flagged content, manages accounts |
| **Guest** | Unauthenticated visitor with read-only access to public profiles and listings |

---

### Use Cases

| ID | Use Case | Actors |
|----|----------|--------|
| UC-01 | Sign Up / Log In with Google (OAuth 2.0) | Guest, Customer, Provider |
| UC-02 | Search for Service Providers (by category, location, filters) | Customer, Guest |
| UC-03 | Book an Appointment (pick service → pick slot → confirm) | Customer |
| UC-04 | Manage Availability Schedule (recurring hours, breaks, blocked dates) | Provider |
| UC-05 | Process Payment (create Payment record, send receipt) | Customer |
| UC-06 | Leave a Review (star rating + comment after completed appointment) | Customer |
| UC-07 | Manage Service Listings (add, edit, deactivate services) | Provider |
| UC-08 | Join a Waitlist (preferred time window, notified when slot opens) | Customer |
| UC-09 | Message a Provider (threaded DMs) | Customer, Provider |
| UC-10 | Review and Resolve Reports (flag → review → action) | Admin |

---

### Entities (18)

| # | Entity | Description |
|---|--------|-------------|
| 1 | User | Base account — login credentials, name, email, OAuth tokens |
| 2 | Customer | A User who books services |
| 3 | ServiceProvider | A User who offers services |
| 4 | BusinessProfile | Public-facing provider profile — bio, experience, Instagram, walk-in policy |
| 5 | Service | A specific offering (name, price, duration, category) |
| 6 | Category | Groups services by type (Hair, Lashes & Brows, Nails, Skincare) |
| 7 | Appointment | Booking between Customer and Provider for a Service at a scheduled time |
| 8 | AvailabilitySchedule | Provider's recurring weekly hours and break times |
| 9 | WaitlistEntry | Customer joins waitlist for a fully-booked provider |
| 10 | Review | Star rating and comment from a Customer after a completed Appointment |
| 11 | Payment | Transaction tied to an Appointment — amount, method, status |
| 12 | ServiceArea | Where a provider works (center point + radius, no exact address) |
| 13 | Portfolio | Work photos uploaded by a provider |
| 14 | Message | Direct message between Customer and Provider |
| 15 | Notification | System alerts for appointment updates, reminders, messages, review prompts |
| 16 | Tag | Keywords for services/profiles to improve search |
| 17 | InstagramPost | Synced Instagram content displayed on provider's portfolio |
| 18 | Report | Flag for inappropriate content or policy violations |

---

### Relationships (22)

| Entity A | Entity B | Cardinality |
|----------|----------|-------------|
| User | Customer | 1:1 |
| User | ServiceProvider | 1:1 |
| ServiceProvider | BusinessProfile | 1:1 |
| ServiceProvider | Service | 1:M |
| Category | Service | 1:M |
| Customer | Appointment | 1:M |
| ServiceProvider | Appointment | 1:M |
| Service | Appointment | 1:M |
| Appointment | Payment | 1:1 |
| ServiceProvider | AvailabilitySchedule | 1:M |
| Customer | WaitlistEntry | 1:M |
| ServiceProvider | WaitlistEntry | 1:M |
| Customer | Review | 1:M |
| ServiceProvider | Review | 1:M |
| ServiceProvider | ServiceArea | 1:M |
| ServiceProvider | Portfolio | 1:M |
| Customer | Message | 1:M |
| ServiceProvider | Message | 1:M |
| User | Notification | 1:M |
| Service | Tag | M:M |
| ServiceProvider | InstagramPost | 1:M |
| User | Report | 1:M |

---

### Non-Functional Requirements

**Performance**
- Support 100k+ registered users
- All standard queries under 200ms
- Indexes on high-traffic columns (provider IDs, appointment dates, category IDs, user FKs)
- PostGIS spatial indexing for location-based queries
- Redis caching for read-heavy pages
- Connection pooling for concurrent users

**Backup**
- Full nightly backups + incremental every 4 hours
- Geographically redundant cloud storage (encrypted at rest)
- 30-day point-in-time recovery window
- Weekly automated restore checks

**Security**
- Role-based access control via authenticated service accounts
- TLS 1.2+ for all DB connections
- AES-256 encryption at rest
- No exact provider addresses stored (center point + radius only)
- Customer location is session-level only, never persisted
- Payment card data handled by Stripe (PCI-DSS compliant) — only transaction ID/status stored
- Parameterized queries / ORM to prevent SQL injection
- Immutable audit trail for admin actions

---

## Milestone 2: ERD & Schema

Included in the full PDF. The ERD maps all 18 entities and 22 relationships.
