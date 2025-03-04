import { useState, useEffect, use } from "react";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import Input from "../UI/Input";
import Popup from "../UI/PopUp";
import styles from "./BookForm.module.css";

const BookForm = ({ method, book }) => {
  const actionData = useActionData() || {};
  const [stateErrors, setStateErrors] = useState(actionData.errors || {});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData.success) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/");
      }, 1000);
    }
  }, [showPopup, actionData.success, navigate]);
  useEffect(() => {
    setStateErrors(actionData.errors || {});
  }, [actionData.errors]);

  return (
    <>
      {showPopup && (
        <Popup>
          <p>{actionData.success}</p>
        </Popup>
      )}
      <Form method={method} className={styles.bookForm} noValidate>
        <Input
          title="Title"
          name="title"
          type="text"
          defaultValue={book ? book.title : ""}
          className={stateErrors?.title && styles.inputError}
          required
          onFocus={() =>
            setStateErrors((prevState) => ({ ...prevState, title: "" }))
          }
        />
        {stateErrors?.title && (
          <p className={styles.errors}>{stateErrors.title}</p>
        )}
        <Input
          title="Author"
          name="author"
          type="text"
          defaultValue={book ? book.author : ""}
          className={stateErrors?.author && styles.inputError}
          onFocus={() =>
            setStateErrors((prevState) => ({ ...prevState, author: "" }))
          }
          required
        />
        {stateErrors?.author && (
          <p className={styles.errors}>{stateErrors.author}</p>
        )}
        <label htmlFor="category">Category</label>
        <select name="category" defaultValue={book ? book.category : ""}>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Mystery">Mystery</option>
          <option value="Thriller">Thriller</option>
        </select>
        <Input
          title="ISBN"
          name="isbn"
          type="number"
          defaultValue={book ? book.isbn : ""}
          required
          maxLength="13"
          onFocus={() =>
            setStateErrors((prevState) => ({ ...prevState, isbn: "" }))
          }
          className={stateErrors?.isbn && styles.inputError}
        />
        {stateErrors?.isbn && (
          <p className={styles.errors}>{stateErrors.isbn}</p>
        )}
        <button className={styles.submitBtn}>
          {method === "POST" ? "Add Book" : "Edit Book"}
        </button>
      </Form>
    </>
  );
};

export default BookForm;

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const method = request.method;
  const book = {
    title: formData.get("title"),
    author: formData.get("author"),
    category: formData.get("category"),
    isbn: formData.get("isbn"),
    ...(method === "POST"
      ? { createdDate: new Date().toISOString() }
      : { modifiedDate: new Date().toISOString() }),
    ...(method === "POST" && { isActivated: true }),
  };

  const errors = {};

  if (!book.title) {
    errors.title = "Title is required";
  }
  if (!book.author) {
    errors.author = "Author is required";
  }
  if (!book.category) {
    errors.category = "Category is required";
  }
  if (!book.isbn || book.isbn.length !== 13) {
    errors.isbn = "ISBN must be 13 digits";
  }
  if (Object.keys(errors).length > 0) {
    console.log(errors);
    return { errors };
  }

  const url =
    method === "POST"
      ? "http://localhost:3000/books"
      : `http://localhost:3000/books/${params.id}`;
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Failed to add book: " + response.statusText,
      }),
      { status: response.status }
    );
  }

  return {
    success:
      method === "POST"
        ? "Book added successfully"
        : "Book updated successfully",
  };
};
