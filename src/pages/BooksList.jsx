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
          book.description.toLowerCase().includes(query.toLowerCase()) ||
          book.yearPublished.toString().includes(query) 
      );
      setFilteredBooks(filtered);
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    handleDeleteBook(id); // Let parent handle deletion
  };

  return (
    <div className="w-full md:w-full p-4 bg-gray-100">
      <NavBar />
      <div>
        <div className="w-full flex flex-row items-center justify-between mb-4">
          <h1 className="text-[15px] md:text-3xl font-bold text-gray-800">
            📚 Book shelves
          </h1>

          {/* count the total book */}
          <TotalBooks count={books.length} />
          <div className="flex flex-col-reverse md:flex-row-reverse items-center justify-center">
            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />

            {/* Add Book Button */}
            <div className="ml-4 mr-5 mb-1 md:mb-0">
              <button
                onClick={() => navigate("/books/add")}
                className="bg-[#1E2939] hover:bg-green-700 hover:scale-105 text-white text-[10px] md:text-[14px] px-2 md:px-4 py-1 md:py-2 rounded-lg cursor-pointer font-medium flex items-center shadow-md"
              >
                <PlusCircleIcon className="size-3 md:size-5 mr-2" /> Add Book
              </button>
            </div>
          </div>
        </div>

        {/* Book List */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border-b border-gray-300 p-2 md:p-3 text-center items-center text-[10px] md:text-[16px] ">
                  Title
                </th>
                <th className="border-b border-gray-300 p-2 md:p-3 text-center text-[10px] md:text-[16px]">
                  Author
                </th>
                <th className="border-b border-gray-300 p-2 md:p-3 text-center text-[10px] md:text-[16px]">
                  Genre
                </th>
                <th className="border-b border-gray-300 p-2 md:p-3 text-center w-40 text-[10px] md:text-[16px]">
                  Published Year
                </th>
                <th className="border-b border-gray-300 p-2 md:p-3 text-center text-[10px] md:text-[16px]">
                  Description
                </th>
                <th className="border-b border-gray-300 p-2 md:p-3 text-center text-[10px] md:text-[16px]">
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
