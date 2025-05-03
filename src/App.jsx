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
import Recycle from "./pages/Recycle";
import { addBook, deleteBook, getAllBooks, updateBook } from "./integration";


const App = () => {
  const [loading , setLoading] = useState(false)
  const [books, setBooks] = useState([]);// state to hold books 
 const fetchBooks = async () => {
   setLoading(true); // Start loading before the fetch
   try {
     const response = await getAllBooks();

     if (response.status === "success") {
       setBooks(response.data.map((book) => ({ ...book, id: book.id })));
     } else {
       toast.error(response.message || "Failed to fetch books.");
     }
   } catch (error) {
     console.error("Error fetching books:", error);
     toast.error("An unexpected error occurred while fetching books.");
   } finally {
     setLoading(false); // Stop loading in all cases
   }
 };

  useEffect(() => {
    fetchBooks();
  }, []);



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
            <BooksList books={books} loading= {loading} handleDeleteBook={handleDeleteBook} />
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
        <Route path="/recycle" element={<Recycle/>} />

        {/* Redirect to books if route is not found */}
        <Route path="*" element={<Navigate to="/books" />} />
      </Routes>
    </Router>
  );
};

export default App;
