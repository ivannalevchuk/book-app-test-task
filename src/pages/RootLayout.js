import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import styles from "./RootLayout.module.css";

const RootLayout = () => {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;