import { useState, useEffect } from "react";
import { useLoaderData, redirect } from "react-router-dom";
import BooksList from "../components/Books";
import FilterBooks from "../components/FilterBooks";
import styles from "./BooksPage.module.css";
import Button from "../UI/ButtonLink";

const BooksPage = () => {
  const books = useLoaderData();
  const [booksList, setBooksList] = useState(books);

  useEffect(() => {
    setBooksList(books);
  }, [books]);

  const handleFilter = (selectedType) => {
    if (selectedType === "all") {
      setBooksList(books);
    } else {
      const isActive = selectedType === "activated";
      const filteredBooks = books.filter(
        (book) => book.isActivated === isActive
      );
      setBooksList(filteredBooks);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button path="/add" >
          + Add Book
        </Button>
        <div className={styles.filterContainer}>
          <FilterBooks onFilter={handleFilter} className={styles.filter} />
          <p className={styles.bookCount}>
            Showing {booksList.length} of {books.length}
          </p>
        </div>
      </div>
     
      <BooksList books={booksList} />
    </div>
  );
};

export default BooksPage;

export async function loader() {
  const response = await fetch("http://localhost:3000/books");
  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Failed to fetch books",
      }),
      { status: response.status }
    );
  } else {
    const books = await response.json();
    return books;
  }
}

export async function action({ request, params }) {
  const formData = await request.formData();

  const bookId = formData.get("id");
  if (request.method === "PATCH") {
    const isActivated = formData.get("isActivated") === "true";
    const response = await fetch(`http://localhost:3000/books/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActivated }),
    });
    if (!response.ok) {
      throw new Response(
        JSON.stringify({
          message: "Failed to update book",
        }),
        { status: response.status, statusText: response.statusText }
      );
    }
    return null;
  }
  if (request.method === "DELETE") {
    const response = await fetch(`http://localhost:3000/books/${bookId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Response(
        JSON.stringify({
          message: "Failed to delete book",
        }),
        { status: response.status, statusText: response.statusText }
      );
    } 
     return redirect(".");
  }
  return new Response(
    JSON.stringify({
      message: "Method not allowed",
    }),
    { status: 405 }
  );
}
