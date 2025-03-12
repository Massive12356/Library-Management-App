import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../comon/NavBar";
import { ToastContainer, toast } from "react-toastify";

const AddBookForm = ({ handleAddBook }) => {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    yearPublished: "",
    description: "",
    pages: "",
  });

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBook((prev) => ({
          ...prev,
          coverImage: reader.result, // Save the base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !book.title ||
      !book.author ||
      !book.genre ||
      !book.yearPublished ||
      !book.pages ||
      !book.description // ✅ Ensure description is not empty
    ) {
      toast.error("Please fill in all fields and upload a cover image");
      return;
    }

    // Add the book
    handleAddBook(book);

    // Navigate back to the list
    // navigate("/");
  };

  return (
    <div className="bg-gray-100">
      <NavBar />
      <div className="max-w-lg mx-auto mt-10  bg-white p-8 shadow-lg rounded-lg">
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/books")}
            className="mb-4 text-green-600 hover:text-green-800 font-medium transition duration-300 cursor-pointer"
          >
            ← Back to Home
          </button>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add a New Book
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={(e) =>
              setBook((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Title"
            className="border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-lg p-3 w-full outline-none"
          />
          {/* Author */}
          <input
            type="text"
            name="author"
            value={book.author}
            onChange={(e) =>
              setBook((prev) => ({ ...prev, author: e.target.value }))
            }
            placeholder="Author"
            className="border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-lg p-3 w-full outline-none"
          />
          {/* Genre */}
          <input
            type="text"
            name="genre"
            value={book.genre}
            onChange={(e) =>
              setBook((prev) => ({ ...prev, genre: e.target.value }))
            }
            placeholder="Genre"
            className="border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-lg p-3 w-full outline-none"
          />
          {/* Published Year */}
          <input
            type="number"
            name="publishedYear"
            value={book.yearPublished}
            onChange={(e) =>
              setBook((prev) => ({ ...prev, yearPublished: e.target.value }))
            }
            placeholder="Published Year"
            className="border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-lg p-3 w-full outline-none"
          />
          <input
            type="number"
            name="pages"
            value={book.pages}
            onChange={(e) =>
              setBook((prev) => ({ ...prev, pages: e.target.value }))
            }
            placeholder="Number of pages"
            className="border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-lg p-3 w-full outline-none"
          />
          {/* ✅ Book Description */}
          <textarea
            name="description"
            value={book.description}
            onChange={(e) =>
              setBook((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Book Description"
            rows="4"
            className="border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 rounded-lg p-3 w-full outline-none resize-none"
          />

          {/* Upload Cover Image */}
          {/* <div>
            <label className="block text-gray-700 font-medium mb-1">
              Upload Cover Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:border-0 file:text-sm file:font-semibold
            file:bg-green-100 file:text-green-700
            hover:file:bg-green-200"
            />
            {book.coverImage && (
              <img
                src={book.coverImage}
                alt="Book Cover"
                className="mt-4 w-full h-48 object-cover rounded-lg"
              />
            )}
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#1E2939] cursor-pointer hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg w-full transition duration-300 ease-in-out"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
