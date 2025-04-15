const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Home page - Show all books
router.get('/', bookController.getAllBooks);

// Search books
router.get('/search', bookController.searchBooks);

// Add a new book - Form
router.get('/books/add', bookController.showAddBookForm);

// Add a new book - Process
router.post('/books/add', bookController.addBook);

// View book details
router.get('/books/:id', bookController.getBookById);

// Edit book - Form
router.get('/books/:id/edit', bookController.showEditBookForm);

// Edit book - Process
router.post('/books/:id/edit', bookController.updateBook);

// Delete book
router.post('/books/:id/delete', bookController.deleteBook);

module.exports = router;