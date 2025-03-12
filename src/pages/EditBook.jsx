import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/comon/NavBar";

const EditBook = ({ books, handleUpdateBook }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the book using the ID from the URL
  const bookToEdit = books.find((book) => book.id === parseInt(id));

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    coverImage: "",
    description: "",
  });

  useEffect(() => {
    if (bookToEdit) {
      setBook(bookToEdit);
    }
  }, [bookToEdit]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBook((prevBook) => ({
          ...prevBook,
          coverImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !book.title ||
      !book.author ||
      !book.genre ||
      !book.publishedYear ||
      !book.description
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // ✅ Use handleUpdateBook to update the book
    handleUpdateBook(book.id, book);

    navigate("/books");
  };

  return (
    <div className="bg-gray-100">
      <NavBar />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
          {/* Back Button */}
          <button
            onClick={() => navigate("/books")}
            className="mb-4 text-green-600 hover:text-green-800 font-medium transition duration-300 cursor-pointer"
          >
            ← Back to Home
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-green-400"
              required
            />
          </div>

          {/* Author */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Author:
            </label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-green-400"
              required
            />
          </div>

          {/* Genre */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Genre:
            </label>
            <input
              type="text"
              name="genre"
              value={book.genre}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-green-400"
              required
            />
          </div>

          {/* Published Year */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Published Year:
            </label>
            <input
              type="number"
              name="publishedYear"
              value={book.publishedYear}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-green-400"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Description:
            </label>
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-green-400"
              rows="4"
              required
            />
          </div>

          {/* Cover Image Upload */}
          <div>
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-[#1E2939] cursor-pointer text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
