document.addEventListener('DOMContentLoaded', function() {
    // Book search auto-suggest (to be implemented when connected to Open Library API)
    const searchInput = document.querySelector('.search-form input[name="q"]');
    if (searchInput) {
      searchInput.addEventListener('focus', function() {
        this.setAttribute('placeholder', 'Search by title or author...');
      });
      
      searchInput.addEventListener('blur', function() {
        this.setAttribute('placeholder', 'Search books by title or author...');
      });
    }
    
    // ISBN input validation
    const isbnInput = document.getElementById('isbn');
    if (isbnInput) {
      isbnInput.addEventListener('blur', function() {
        const value = this.value.trim();
        if (value && !isValidISBN(value)) {
          alert('Please enter a valid 10 or 13 digit ISBN number.');
        }
      });
    }
    
    // Rating display enhancement
    const ratingElements = document.querySelectorAll('.rating');
    ratingElements.forEach(element => {
      const ratingText = element.textContent;
      const ratingMatch = ratingText.match(/Rating: (\d+)\/10/);
      
      if (ratingMatch) {
        const ratingValue = parseInt(ratingMatch[1]);
        let stars = '';
        
        // Create visual representation
        for (let i = 1; i <= 10; i++) {
          if (i <= ratingValue) {
            stars += '★'; // Filled star
          } else {
            stars += '☆'; // Empty star
          }
        }
        
        // Keep the original text but add visual stars on hover
        element.setAttribute('title', stars);
      }
    });
    
    // Add smooth transitions for page loads
    document.body.classList.add('loaded');
    
    // Add nice fade effect for books grid
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = 1;
      }, 100 * index);
    });
    
    // Form validation for add/edit book
    const bookForm = document.querySelector('.book-form');
    if (bookForm) {
      bookForm.addEventListener('submit', function(e) {
        const titleInput = document.getElementById('title');
        const authorInput = document.getElementById('author');
        const notesInput = document.getElementById('notes');
        
        if (!titleInput.value.trim()) {
          e.preventDefault();
          alert('Please enter a book title');
          titleInput.focus();
          return;
        }
        
        if (!authorInput.value.trim()) {
          e.preventDefault();
          alert('Please enter an author name');
          authorInput.focus();
          return;
        }
        
        if (!notesInput.value.trim()) {
          e.preventDefault();
          alert('Please enter some notes about the book');
          notesInput.focus();
          return;
        }
      });
    }
  });
  
  // ISBN validation function (supports both ISBN-10 and ISBN-13)
  function isValidISBN(isbn) {
    // Remove hyphens or spaces
    isbn = isbn.replace(/[-\s]/g, '');
    
    // ISBN-10 validation
    if (isbn.length === 10) {
      let sum = 0;
      
      // Check if all characters except the last one are digits
      if (!/^\d{9}[\dX]$/.test(isbn)) {
        return false;
      }
      
      // Calculate checksum
      for (let i = 0; i < 9; i++) {
        sum += parseInt(isbn.charAt(i)) * (10 - i);
      }
      
      // Check digit can be 'X' which equals 10
      let check = isbn.charAt(9);
      if (check === 'X') {
        check = 10;
      } else {
        check = parseInt(check);
      }
      
      return (sum + check) % 11 === 0;
    }
    
    // ISBN-13 validation
    else if (isbn.length === 13) {
      let sum = 0;
      
      // Check if all characters are digits
      if (!/^\d{13}$/.test(isbn)) {
        return false;
      }
      
      // Calculate checksum
      for (let i = 0; i < 12; i++) {
        sum += parseInt(isbn.charAt(i)) * (i % 2 === 0 ? 1 : 3);
      }
      
      let check = (10 - (sum % 10)) % 10;
      
      return parseInt(isbn.charAt(12)) === check;
    }
    
    return false;
  }