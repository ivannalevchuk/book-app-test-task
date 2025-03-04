import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import BooksPage, {
  loader as booksLoader,
  action as updateBookStatusAction,
} from "./pages/BooksPage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage, { loader as editBookLoader } from "./pages/EditBookPage";
import { action as manipulateBookAction } from "./components/BookForm";
import RootLayout from "./pages/RootLayout";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <BooksPage />,
        loader: booksLoader,
        action: updateBookStatusAction,
      },
      {
        path: "/add",
        element: <AddBookPage />,
        action: manipulateBookAction,
      },
      {
        path: "/:id",
        element: <EditBookPage />,
        loader: editBookLoader,
        action: manipulateBookAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
