const Book = require('../models/Book');
const axios = require('axios');

exports.getAllBooks = async (req, res) => {
  try {
    const sortBy = req.query.sort || 'date_read';
    const order = req.query.order || 'DESC';
    const books = await Book.getAll(sortBy, order);
    res.render('index', { 
      books,
      title: 'My Book Notes',
      currentSort: sortBy,
      currentOrder: order
    });
  } catch (error) {
    console.error('Error in getAllBooks:', error);
    res.status(500).render('index', { 
      books: [],
      title: 'My Book Notes - Error',
      error: 'Failed to fetch books. Please try again later.'
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.getById(req.params.id);
    if (!book) {
      return res.status(404).render('book-detail', { 
        error: 'Book not found',
        title: 'Book Not Found'
      });
    }
    res.render('book-detail', { 
      book,
      title: book.title
    });
  } catch (error) {
    console.error('Error in getBookById:', error);
    res.status(500).render('book-detail', { 
      error: 'Failed to fetch book details. Please try again later.',
      title: 'Error'
    });
  }
};

exports.showAddBookForm = (req, res) => {
  res.render('add-book', { 
    title: 'Add New Book',
    book: {}
  });
};

exports.addBook = async (req, res) => {
  try {
    const { title, author, isbn, rating, notes, date_read } = req.body;
    
    // Fetch book cover from Open Library if ISBN is provided
    let cover_url = '';
    if (isbn) {
      try {
        cover_url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
      } catch (apiError) {
        console.error('Error fetching book cover:', apiError);
      }
    }
    
    const newBook = await Book.create({
      title,
      author,
      isbn,
      cover_url,
      rating: parseInt(rating),
      notes,
      date_read
    });
    
    res.redirect('/');
  } catch (error) {
    console.error('Error in addBook:', error);
    res.status(500).render('add-book', { 
      title: 'Add New Book - Error',
      book: req.body,
      error: 'Failed to add book. Please try again.'
    });
  }
};

exports.showEditBookForm = async (req, res) => {
  try {
    const book = await Book.getById(req.params.id);
    if (!book) {
      return res.status(404).render('edit-book', { 
        error: 'Book not found',
        title: 'Book Not Found'
      });
    }
    res.render('edit-book', { 
      book,
      title: `Edit ${book.title}`
    });
  } catch (error) {
    console.error('Error in showEditBookForm:', error);
    res.status(500).render('edit-book', { 
      error: 'Failed to fetch book. Please try again later.',
      title: 'Error'
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, isbn, rating, notes, date_read } = req.body;
    const id = req.params.id;
    
    // Get current book data to check if ISBN changed
    const currentBook = await Book.getById(id);
    
    // Only update cover URL if ISBN changed
    let cover_url = currentBook.cover_url;
    if (isbn && isbn !== currentBook.isbn) {
      cover_url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
    }
    
    await Book.update(id, {
      title,
      author,
      isbn,
      cover_url,
      rating: parseInt(rating),
      notes,
      date_read
    });
    
    res.redirect(`/books/${id}`);
  } catch (error) {
    console.error('Error in updateBook:', error);
    res.status(500).render('edit-book', { 
      book: { ...req.body, id: req.params.id },
      title: 'Edit Book - Error',
      error: 'Failed to update book. Please try again.'
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.delete(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error('Error in deleteBook:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to delete book. Please try again later.'
    });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const query = req.query.q || '';
    const books = await Book.search(query);
    res.render('index', { 
      books,
      title: `Search Results for "${query}"`,
      searchQuery: query
    });
  } catch (error) {
    console.error('Error in searchBooks:', error);
    res.status(500).render('index', { 
      books: [],
      title: 'Search Error',
      error: 'Failed to search books. Please try again later.'
    });
  }
};