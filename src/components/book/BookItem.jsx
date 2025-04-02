import { useNavigate } from "react-router-dom";
import { TrashIcon, EyeIcon, PencilIcon} from "@heroicons/react/24/solid";

const BookItem = ({ book, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <tr className="hover:bg-gray-100 transition-colors text-center">
      <td className="border-b border-gray-200 p-3 font-medium w-50 text-[10px] md:text-[17px]">
        {book.title}
      </td>
      <td className="border-b border-gray-200 p-3 font-medium text-[10px] md:text-[17px]">
        {book.author}
      </td>
      <td className="border-b border-gray-200 p-3 font-medium text-[10px] md:text-[17px]">
        {book.genre}
      </td>
      <td className="border-b border-gray-200 p-3 font-medium text-[10px] md:text-[17px]">
        {book.yearPublished}
      </td>
      <td className="border-b border-gray-200 p-3 font-medium text-[10px] md:text-[17px]">
        {book.description || (
          <span className="text-gray-400 font-medium">
            No description available
          </span>
        )}
      </td>
      <td className="border-b border-gray-200 p-3">
        <div className="flex justify-center gap-2">
          {/* View Button */}
          <button
            onClick={() => navigate(`/books/view/${book.id}`)}
            className="flex items-center cursor-pointer font-medium  bg-blue-500 hover:bg-blue-600 hover:scale-105 text-white px-3 py-2 rounded shadow"
          >
            <EyeIcon className="size-4 mr-2" />{" "}
            <span className="hidden md:block">View</span>
          </button>

          {/* Edit Button */}
          <button
            onClick={() => navigate(`/books/edit/${book.id}`)}
            className="flex items-center cursor-pointer font-medium bg-green-500 hover:bg-green-600 hover:scale-105 text-white px-3 py-1 rounded shadow"
          >
            <PencilIcon className="size-4 mr-2" />
            <span className="hidden md:block">Edit</span>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(book.id)}
            className="flex items-center cursor-pointer font-medium bg-red-500 hover:bg-red-600 hover:scale-105 text-white px-3 py-1 rounded shadow"
          >
            <TrashIcon className="size-4 mr-2" />{" "}
            <span className="hidden md:block">Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookItem;
