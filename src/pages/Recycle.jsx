import { useNavigate } from "react-router-dom";
import SearchBar from "../components/search/SearchBar";
import { useState, useEffect } from "react";
import { PlusCircleIcon, ArrowTurnUpLeftIcon } from "@heroicons/react/24/solid";
import NavBar from "../components/comon/NavBar";

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

  return (
    <div className="w-full p-4 bg-gray-100">
      <NavBar />
      <div>
        <div className="w-full flex flex-row items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800">♻️ Book Recycle</h1>

            <button onClick={() => navigate("/books")}> <ArrowTurnUpLeftIcon className="w-6 h-6 text-gray-900 cursor-pointer" /> </button>
          {/* count the total book */}
          <div className="flex flex-row-reverse items-center justify-center">
            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />


            {/* Add Book Button */}
            {/* <div className="ml-4 mr-5">
              <button
                onClick={() => navigate("/books/add")}
                className="bg-[#1E2939] hover:bg-green-700 hover:scale-105 text-white px-4 py-2 rounded-lg cursor-pointer font-medium flex items-center shadow-md"
              >
                <PlusCircleIcon className="size-5 mr-2" /> Add Book
              </button>
            </div> */}
          </div>
        </div>

        {/* Book List */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border-b border-gray-300 p-3 text-center items-center ">
                  Title
                </th>
                <th className="border-b border-gray-300 p-3 text-center">
                  Author
                </th>
                <th className="border-b border-gray-300 p-3 text-center">
                  Genre
                </th>
                <th className="border-b border-gray-300 p-3 text-center w-40">
                  Published Year
                </th>
                <th className="border-b border-gray-300 p-3 text-center">
                  Description
                </th>
                <th className="border-b border-gray-300 p-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BooksList;
