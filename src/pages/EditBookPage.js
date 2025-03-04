import { useLoaderData } from "react-router-dom";
import BookForm from "../components/BookForm";
import Button from "../UI/ButtonLink";
import styles from "./FormBookPage.module.css";

const EditBookPage = () => {
  const book = useLoaderData();
  return (
    <div>
      <div className={styles.container}>
        <Button path="/" className={styles.buttonBack}>All Books</Button>
        <h1 className={styles.title}>Edit Book</h1>
      </div>

      <BookForm method="PATCH" book={book} />
    </div>
  );
};

export default EditBookPage;

export const loader = async ({ params }) => {
  console.log(params.id);
  const response = await fetch(`http://localhost:3000/books/${params.id}`);
  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Failed to fetch book",
      }),
      { status: response.status }
    );
  } else {
    const book = await response.json();
    console.log("book ", book);
    return book;
  }
};
