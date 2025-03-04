import styles from "./ButtonLink.module.css";
import { Link } from "react-router-dom";

const Button = ({ children, path, className }) => {
  return (
    <Link className={`${styles.button} ${className}`} to={path}>
      {children}
    </Link>
  );
};

export default Button;
