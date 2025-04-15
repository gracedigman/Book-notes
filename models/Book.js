const db = require('../config/db');

class Book {
  // Get all books with optional sorting
  static async getAll(sortBy = 'date_read', sortOrder = 'DESC') {
    let validSortColumns = ['title', 'author', 'rating', 'date_read', 'created_at'];
    let validSortOrders = ['ASC', 'DESC'];
    
    // Validate sort parameters to prevent SQL injection
    if (!validSortColumns.includes(sortBy)) sortBy = 'date_read';
    if (!validSortOrders.includes(sortOrder)) sortOrder = 'DESC';
    
    try {
      const result = await db.query(
        `SELECT * FROM books ORDER BY ${sortBy} ${sortOrder}`
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  // Get a single book by ID
  static async getById(id) {
    try {
      const result = await db.query('SELECT * FROM books WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching book by ID:', error);
      throw error;
    }
  }

  // Create a new book
  static async create(bookData) {
    const { title, author, isbn, cover_url, rating, notes, date_read } = bookData;
    
    try {
      const result = await db.query(
        'INSERT INTO books (title, author, isbn, cover_url, rating, notes, date_read) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [title, author, isbn, cover_url, rating, notes, date_read]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  }

  // Update an existing book
  static async update(id, bookData) {
    const { title, author, isbn, cover_url, rating, notes, date_read } = bookData;
    
    try {
      const result = await db.query(
        'UPDATE books SET title = $1, author = $2, isbn = $3, cover_url = $4, rating = $5, notes = $6, date_read = $7 WHERE id = $8 RETURNING *',
        [title, author, isbn, cover_url, rating, notes, date_read, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  }

  // Delete a book
  static async delete(id) {
    try {
      await db.query('DELETE FROM books WHERE id = $1', [id]);
      return true;
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }

  // Search books
  static async search(query) {
    try {
      const result = await db.query(
        `SELECT * FROM books 
         WHERE title ILIKE $1 OR author ILIKE $1
         ORDER BY date_read DESC`,
        [`%${query}%`]
      );
      return result.rows;
    } catch (error) {
      console.error('Error searching books:', error);
      throw error;
    }
  }
}

module.exports = Book;