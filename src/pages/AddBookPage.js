import BookForm from "../components/BookForm";
import Button from "../UI/ButtonLink";
import styles from "./FormBookPage.module.css";

const AddBookPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <Button path="/" className={styles.buttonBack}>
          All Books
        </Button>
        <h1 className={styles.title}>Add Book</h1>
      </div>

      <BookForm method="POST" />
    </div>
  );
};

export default AddBookPage;
