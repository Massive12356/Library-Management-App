import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";

const SearchBar = ({ search, onSearch }) => {
  return (
    <div className="flex relative">
      <input
        type="text"
        value={search}
        placeholder="Search by ID, Title, or Author"
        onChange={(e) => onSearch(e.target.value)}
        className="border border-gray-300 bg-white p-2 w-70 rounded-sm text-[15px] shadow-lg shadow-blue-500/50 outline-none"
      />
      {search ? (
        <div
          onClick={() => onSearch("")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center z-10 bg-gray-200 w-10 h-10 cursor-pointer rounded-full"
        >
          <span className="text-red-500 cursor-pointer text-lg">&times;</span>
        </div>
      ) : (
        <div
          onClick={() => document.querySelector("input").focus()}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center z-10 bg-gray-200 w-10 h-10 cursor-pointer rounded-full"
        >
          <MagnifyingGlassIcon className="w-5 text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
