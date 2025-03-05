import { useState } from "react";
import { Link, useFetcher } from "react-router-dom";
import { dateFormatter } from "../util/dateFormatter";
import styles from "./BookItem.module.css";

const BookItem = ({ book }) => {
  const fetcher = useFetcher();
  const [isBookActivated, setIsActivated] = useState(book.isActivated);


  const toggleActivated = async () => {
    const newStatus = !isBookActivated;
    setIsActivated(newStatus);
    fetcher.submit(
      { id: book.id, isActivated: newStatus },
      { method: "PATCH" }
    );
    console.log(book.id, book.isActivated);
  };

  const handleDelete = async () => {
    const proceed = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (proceed) {
      fetcher.submit({ id: book.id }, { method: "DELETE" },{
        onSuccess: () => {
          fetcher.load("/");
        }
      });
    }
  };
  return (
    <tr
      className={`${styles.bookItem} ${
        !isBookActivated ? styles.deactivatedBook : ""
      }`}
    >
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.category}</td>
      <td>{book.isbn}</td>
      <td>{dateFormatter(book.createdDate)}</td>
      <td>{book.modifiedDate ? dateFormatter(book.modifiedDate) : "-"}</td>
      <td>
        <div className={styles.actions}>
        <Link to={`${book.id}`} className={styles.edit}>Edit</Link>
        {!isBookActivated && (
          <button className={styles.delete} onClick={handleDelete}>
            Delete
          </button>
        )}
        <button
          className={!isBookActivated ? styles.activate : styles.deactivate}
          onClick={toggleActivated}
        >
          {isBookActivated ? "Deactivate" : "Activate"}
        </button>
        </div>
      </td>
    </tr>
  );
};

export default BookItem;
