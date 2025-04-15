const axios = require('axios');

exports.searchBooks = async (req, res) => {
  const query = req.query.q;
  
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    
    // Extract relevant data from API response
    const books = response.data.docs.slice(0, 10).map(book => ({
      title: book.title,
      author: book.author_name ? book.author_name[0] : 'Unknown',
      isbn: book.isbn ? book.isbn[0] : null,
      published_year: book.first_publish_year,
      cover_id: book.cover_i
    }));
    
    res.json(books);
  } catch (error) {
    console.error('Error fetching books from API:', error);
    res.status(500).json({ error: 'Failed to fetch books from Open Library API' });
  }
};

exports.getBookCover = async (req, res) => {
  const { isbn } = req.params;
  
  if (!isbn) {
    return res.status(400).json({ error: 'ISBN is required' });
  }
  
  try {
    const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
    res.json({ coverUrl });
  } catch (error) {
    console.error('Error fetching book cover:', error);
    res.status(500).json({ error: 'Failed to fetch book cover' });
  }
};