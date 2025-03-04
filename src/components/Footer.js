import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
       <p>
        <a
          href="https://github.com/ivannalevchuk"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
      </p>
        </footer>
    );
}

export default Footer;