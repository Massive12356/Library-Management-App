import AddBookForm from "../components/book/AddBookForm";

const AddBook = ({ setBooks }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Add New Book</h1>
      <AddBookForm setBooks={setBooks} />
    </div>
  );
};

export default AddBook;
