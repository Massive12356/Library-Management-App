import { useState } from "react";
import NavBar from "../comon/NavBar";

const EditBookForm = ({ book, setBooks }) => {
  const [formData, setFormData] = useState(book);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setBooks((prev) => prev.map((b) => (b.id === book.id ? formData : b)));
  };

  return (
    <>
    <NavBar />
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        className="border border-gray-300 p-2 w-full"
        />
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        required
        className="border border-gray-300 p-2 w-full"
        />
      <input
        type="text"
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        required
        className="border border-gray-300 p-2 w-full"
        />
      <input
        type="number"
        name="year"
        value={formData.year}
        onChange={handleChange}
        required
        className="border border-gray-300 p-2 w-full"
        />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        >
        Save Changes
      </button>
    </form>
        </>
  );
};

export default EditBookForm;
