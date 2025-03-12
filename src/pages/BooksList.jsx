import { useNavigate } from "react-router-dom";
import BookItem from "../components/book/BookItem";
import SearchBar from "../components/search/SearchBar";
import { useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import NavBar from "../components/comon/NavBar";
import TotalBooks from "../components/comon/TotalBooks";

const BooksList = ({ books, handleDeleteBook }) => {
  const navigate = useNavigate();
  const [filteredBooks, setFilteredBooks] = useState(books);

  // Sync filteredBooks with books state
  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  // Handle search
  const handleSearch = (query) => {
    if (query.trim() === "") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()) ||
          book.genre.toLowerCase().includes(query.toLowerCase()) ||
          book.publishedYear.toString().includes(query)
      );
      setFilteredBooks(filtered);
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    handleDeleteBook(id); // Let parent handle deletion
  };

  return (
    <div className="w-full p-4 bg-gray-100">
      <NavBar />
      <div>
        <div className="w-full flex flex-row items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800">📚 Book shelves</h1>

          {/* count the total book */}
          <TotalBooks count={books.length} />
          <div className="flex flex-row-reverse items-center justify-center">
            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />

            {/* Add Book Button */}
            <div className="ml-4 mr-5">
              <button
                onClick={() => navigate("/books/add")}
                className="bg-[#1E2939] hover:bg-green-700 hover:scale-105 text-white px-4 py-2 rounded-lg cursor-pointer font-medium flex items-center shadow-md"
              >
                <PlusCircleIcon className="size-5 mr-2" /> Add Book
              </button>
            </div>
          </div>
        </div>

        {/* Book List */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border-b border-gray-300 p-3 text-left">
                  Title
                </th>
                <th className="border-b border-gray-300 p-3 text-left">
                  Author
                </th>
                <th className="border-b border-gray-300 p-3 text-left">
                  Genre
                </th>
                <th className="border-b border-gray-300 p-3 text-left">
                  Published Year
                </th>
                <th className="border-b border-gray-300 p-3 text-left">
                  Description
                </th>
                <th className="border-b border-gray-300 p-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <BookItem
                  key={book.id}
                  book={book}
                  handleDelete={() => handleDelete(book.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BooksList;
