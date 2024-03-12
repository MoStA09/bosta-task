
const Book = require('../models/BookModel');

const bookController = {
  getAllBooks: (req, res) => {
    Book.getAllBooks((books) => {
      res.json(books);
    });
  },

  addBook: (req, res) => {
    const newBook = req.body;
    Book.addBook(newBook, (result) => {
      res.json({ message: 'Book added successfully', id: result.insertId });
    });
  }, 

  deleteBook: (req, res) => {
    const id = req.body.id
    Book.deleteBook(id, (result) => {
      if(result == true){
        res.json({message: 'Book deleted successfully', id: id});
      }
      else{
        res.json({message: "No book found with ID: "+ id});

      }
    })
  },
  searchBook: (req, res) => {
    const searchParam = req.params.searchParam;
    Book.searchBook(searchParam, (err, result) => { // Receive error and result
        if (err) {
            res.status(500).json({ error: "An error occurred while searching for books" });
        } else {
            res.json(result);
        }
    });
}

};

module.exports = bookController;
