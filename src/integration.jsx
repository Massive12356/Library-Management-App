import axios from "axios";

const backend_url = "https://library-api-vmf9.onrender.com/library/books";




export const getAllBooks = async () => {
  try {
    const response = await axios.get(backend_url);
    return { status: "success", data: response.data };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Failed to fetch data" };
  }
};

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${backend_url}/${id}`);
    return { status: "success", data: response.data };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Failed to fetch data" };
  }
};

export const addBook = async (book) => {
  try {
    const response = await axios.post(backend_url, book);
    return { status: "success", data: response.data };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Failed to add book" };
  }
};

export const updateBook = async (id, book) => {
  try {
    const response = await axios.patch(`${backend_url}/${id}`, book);
    return { status: "success", data: response.data };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Failed to update book" };
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${backend_url}/${id}`);
    return { status: "success" };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Failed to delete book" };
  }
};
