import styles from "./FilterBooks.module.css";

const FilterBooks = ({ onFilter }) => {

    const handleChange = (e) => {
        onFilter(e.target.value);
    }
    return(
        <select name = "books" onChange = {handleChange} className={styles.filterSelect}>
            <option value="all">Show All</option>
            <option value="activated">Show Activated</option>
            <option value="deactivated">Show Deactivated</option>
        </select>
    )
}

export default FilterBooks;