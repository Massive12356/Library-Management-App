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
import { getAllBooks } from "./integration";

const App = () => {
  useEffect(() => {
    const response = getAllBooks();
    if (response.status === "success") {
      setBooks(response.data);
      toast.success("Books fetched successfully!");
    } else {
      toast.error("Failed to fetch books!");
    }
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

  const handleAddBook = (newBook) => {
    setBooks((prevBooks) => [
      ...prevBooks,
      { ...newBook, id: prevBooks.length + 1 },
    ]);
    toast.success("Book added successfully!");
  };

  const handleUpdateBook = (id, updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, ...updatedBook } : book
      )
    );
    toast.success("Book updated successfully!");
  };

  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    toast.success("Book deleted successfully!");
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
        <Route path="/books/view/:id" element={<ViewBook books={books} />} />

        {/* Edit Book */}
        <Route
          path="/books/edit/:id"
          element={
            <EditBook books={books} handleUpdateBook={handleUpdateBook} />
          }
        />

        {/* Add Book */}
        <Route
          path="/books/add"
          element={<AddBookForm setBooks={setBooks} />}
        />

        {/* Redirect to books if route is not found */}
        <Route path="*" element={<Navigate to="/books" />} />
      </Routes>
    </Router>
  );
};

export default App;
