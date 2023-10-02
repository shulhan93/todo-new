import styles from "./Category.module.css";
import iconEdit from "../../assets/icons/edit.svg";

export default function Category({
  category,
  activeCategory,
  onChangeCategory,
}) {
  const isActive = category.id === activeCategory.id;

  return (
    <li
      className={`${styles.category} ${isActive ? styles.active : ""}`}
      onClick={() => onChangeCategory(category)}
    >
      <span>{category.title}</span>
    </li>
  );
}
