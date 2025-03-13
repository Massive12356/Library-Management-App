import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BooksList from "./pages/BooksList";
import ViewBook from "./pages/ViewBook";
import EditBook from "./pages/EditBook";
import AddBookForm from "./components/book/AddBookForm";
import LandingPage from "./pages/LandingPage";
import { addBook, deleteBook, getAllBooks, updateBook } from "./integration";

const App = () => {
  const fetchBooks = async () => {
    const response = await getAllBooks();
    if (response.status === "success") {
      setBooks(response.data.map((book) => ({ ...book, id: book.id })));
    } else {
      toast.error(response.message);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const [books, setBooks] = useState([]);
  // const [books, setBooks] = useState([
  //   {
  //     id: 1,
  //     title: "The Great Gatsby",
  //     author: "F. Scott Fitzgerald",
  //     description: "Sample description",
  //     genre: "Fiction",
  //     publishedYear: 1925,
  //   },
  //   {
  //     id: 2,
  //     title: "To Kill a Mockingbird",
  //     author: "Harper Lee",
  //     genre: "Fiction",
  //     description: "Sample description",
  //     publishedYear: 1960,
  //   },
  //   {
  //     id: 3,
  //     title: "Church",
  //     author: "George Orwell",
  //     genre: "Dystopian",
  //     description: "Sample description",
  //     publishedYear: 1950,
  //   },
  //   {
  //     id: 4,
  //     title: "Programming",
  //     author: "George Orwell",
  //     genre: "Football",
  //     description: "Sample description",
  //     publishedYear: 1951,
  //   },
  //   {
  //     id: 5,
  //     title: "Power",
  //     author: "George Orwell",
  //     genre: "Football",
  //     description: "Sample description",
  //     publishedYear: 1952,
  //   },
  //   {
  //     id: 6,
  //     title: "Peace",
  //     author: "George Orwell",
  //     genre: "Dystopian",
  //     description: "Sample description",
  //     publishedYear: 1953,
  //   },
  //   {
  //     id: 7,
  //     title: "War",
  //     author: "George Orwell",
  //     genre: "Dystopian",
  //     description: "Sample description",
  //     publishedYear: 1954,
  //   },
  // ]);

  const handleAddBook = async (newBook) => {
    const response = await addBook(newBook);
    if (response.status === "success") {
      fetchBooks();
      toast.success("Book added successfully!");
    } else {
      toast.error(response.message);
    }
  };

  const handleUpdateBook = async (id, updatedBook) => {
    const response = await updateBook(id, updatedBook);
    if (response.status === "success") {
      fetchBooks();
      toast.success("Book updated successfully!");
    } else {
      toast.error(response.message);
    }
  };

  const handleDeleteBook = async (id) => {
    const response = await deleteBook(id);
    if (response.status === "success") {
      console.log("Deleted book with id: ", id);
      fetchBooks();
      toast.success("Book deleted successfully!");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Router>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Book List */}
        <Route
          path="/books"
          element={
            <BooksList books={books} handleDeleteBook={handleDeleteBook} />
          }
        />

        {/* View Book */}
        <Route path="/books/view/:id" element={<ViewBook />} />

        {/* Edit Book */}
        <Route
          path="/books/edit/:id"
          element={<EditBook handleUpdateBook={handleUpdateBook} />}
        />

        {/* Add Book */}
        <Route
          path="/books/add"
          element={<AddBookForm handleAddBook={handleAddBook} />}
        />

        {/* Redirect to books if route is not found */}
        <Route path="*" element={<Navigate to="/books" />} />
      </Routes>
    </Router>
  );
};

export default App;
