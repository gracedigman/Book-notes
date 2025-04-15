# Book Notes

A personal book notes tracking application inspired by Derek Sivers' book notes website. This application allows you to maintain a personal library of books you've read, complete with ratings, notes, and cover images fetched from the Open Library API.

## Features

- Add, edit, and delete book entries
- Record book titles, authors, ratings, and detailed notes
- Automatically fetch book covers using ISBNs via Open Library Covers API
- Sort your book collection by rating, date read, or title
- Search functionality to quickly find books
- Responsive design for desktop and mobile devices

## Screenshots

(Add screenshots of your application here)

## Technologies Used

- Node.js and Express.js for the backend
- PostgreSQL for database storage
- EJS for templating
- Axios for API requests
- Vanilla JavaScript, CSS, and HTML for frontend

## Installation

1. Clone the repository
```
git clone https://github.com/yourusername/book-notes.git
cd book-notes
```

2. Install dependencies
```
npm install
```

3. Set up PostgreSQL database
```
# Log into PostgreSQL
psql -U postgres

# Run the database setup script
\i database.sql
```

4. Create a `.env` file based on the provided `.env.example`:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=book_notes
DB_PASSWORD=your_password
DB_PORT=5432
PORT=3000
```

5. Start the server
```
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `/config` - Database configuration
- `/controllers` - Route controllers
- `/models` - Database models
- `/public` - Static assets (CSS, JS, images)
- `/routes` - Express routes
- `/views` - EJS templates
- `index.js` - Application entry point

## Database Schema

The application uses a single `books` table with the following columns:

- `id` - Primary key
- `title` - Book title
- `author` - Book author
- `isbn` - ISBN (optional, used for fetching book covers)
- `cover_url` - URL to the book cover image
- `rating` - Rating from 1-10
- `notes` - Detailed notes about the book
- `date_read` - Date when the book was read
- `created_at` - Record creation timestamp
- `updated_at` - Record update timestamp

## API Integration

The application integrates with the Open Library Covers API to fetch book covers based on ISBN. The API endpoint used is:

```
https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg
```

## License

MIT

## Acknowledgements

- Inspired by [Derek Sivers' book notes](https://sive.rs/book)
- Thanks to [Open Library](https://openlibrary.org) for their free book covers API