import BookItem from "./BookItem";
import styles from "./Books.module.css";

const BooksList = ({ books }) => {
  return (
    <div className={styles.booksContainer}>
      <table className={styles.booksTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>ISBN</th>
            <th>Created At</th>
            <th>Modified At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => <BookItem key={book.id} book={book} />)
          ) : (
            <tr>
              <td colSpan="7">No books available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
