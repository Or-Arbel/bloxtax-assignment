# Bloxtax Technical Assignment

Single-page application for viewing crypto transactions stored in a SQLite database.

## Overview

This project displays cryptocurrency transaction data in a responsive table interface with server-side pagination and export functionality.

The application was built using the provided Bun + React starter stack and consumes the existing SQLite database included in the repository.

## Features

### Implemented

- Transactions table view
- Server-side pagination
- Responsive layout for desktop and mobile
- Export to CSV/Excel-compatible file
- SQLite integration using the provided dataset

### Notes

- Pagination is handled on the server side using paged database queries.
- Excel export was implemented without external spreadsheet libraries, according to the assignment requirements.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Bun |
| Frontend | React 19 |
| Styling | Tailwind CSS |
| Database | SQLite |
| ORM | Drizzle ORM |

## Getting Started

### Prerequisites

Install Bun:

```bash
curl -fsSL https://bun.sh/install | bash
```

Or download from:
https://bun.sh

---

### Install dependencies

```bash
bun install
```

### Run the development server

```bash
bun run dev
```

The application will be available at:

```bash
http://localhost:3000
```

## Database

The SQLite database is already included in the repository:

```bash
src/api/db/database.db
```

No migration or seeding is required.

## Project Structure

The project contains:

- Frontend React application
- API routes served with Bun
- SQLite database access layer
- CSV export utility

## Future Improvements

Potential improvements that could be added:

- Column sorting
- Column filtering
- Improved mobile table interactions
- Advanced export options