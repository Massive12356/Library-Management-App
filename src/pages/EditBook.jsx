import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/comon/NavBar";
import { getBookById } from "../integration";

const EditBook = ({ handleUpdateBook }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});

  // Find the book using the ID from the URL
  useEffect(() => {
    const fetchBook = async () => {
      const response = await getBookById(id);
      if (response.status === "success") {
        setBook(response.data);
      } else {
        toast.error(response.message);
      }
    };
    fetchBook();
  }, []);

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
      !book.yearPublished ||
      !book.pages ||
      !book.description
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // ✅ Use handleUpdateBook to update the book
    handleUpdateBook(id, book);
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
              onChange={(e) =>
                setBook((prevBook) => ({ ...prevBook, title: e.target.value }))
              }
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
              onChange={(e) =>
                setBook((prevBook) => ({ ...prevBook, author: e.target.value }))
              }
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
              onChange={(e) =>
                setBook((prevBook) => ({ ...prevBook, genre: e.target.value }))
              }
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
              value={book.yearPublished}
              onChange={(e) =>
                setBook((prevBook) => ({
                  ...prevBook,
                  yearPublished: e.target.value,
                }))
              }
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:border-green-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Pages:
            </label>
            <input
              type="number"
              name="pages"
              value={book.pages}
              onChange={(e) =>
                setBook((prevBook) => ({ ...prevBook, pages: e.target.value }))
              }
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
              onChange={(e) =>
                setBook((prevBook) => ({
                  ...prevBook,
                  description: e.target.value,
                }))
              }
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
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:border-0 file:text-sm file:font-semibold
            file:bg-green-100 file:text-green-700
            hover:file:bg-green-200"
            />
            {book.image && (
              <img
                src={`https://savefiles.org/${book.image}?shareable_link=625`}
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
