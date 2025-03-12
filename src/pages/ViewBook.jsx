import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/comon/NavBar";

const ViewBook = ({ books }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the book by ID
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return <div className="text-center text-red-500">Book not found</div>;
  }

  return (
    <div className="bg-gray-100">
      <NavBar />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
        {/* Book Cover Image */}
        {book.coverImage && (
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}

        {/* Book Details */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h2>
        <p className="text-gray-600 text-lg">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="text-gray-600 text-lg">
          <strong>Genre:</strong> {book.genre}
        </p>
        <p className="text-gray-600 text-lg">
          <strong>Published Year:</strong> {book.publishedYear}
        </p>
        <p className="text-gray-600 text-lg">
          <strong>Description:</strong> {book.description}
        </p>

        {/* Back Button */}
        <button
          onClick={() => navigate("/books")}
          className="mt-6 text-green-600 hover:text-green-800 font-medium transition duration-300 cursor-pointer"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default ViewBook;
