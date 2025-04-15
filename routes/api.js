const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Search books from Open Library API
router.get('/search-books', apiController.searchBooks);

// Get book cover URL from ISBN
router.get('/book-cover/:isbn', apiController.getBookCover);

module.exports = router;