import AddCategory from "../AddCategory/AddCategory";
import Category from "../Category/Category";
import styles from "./Categories.module.css";

const Categories = ({
  categories,
  activeCategory,
  onChangeCategory,
  onAddCategory,
}) => {
  return (
    <div className={styles.categories}>
      <h2 className={styles.title}>Категории</h2>
      <ul className={styles.categoriesList}>
        {categories.map((item, i) => (
          <Category
            key={i}
            category={item}
            onChangeCategory={onChangeCategory}
            activeCategory={activeCategory}
          />
        ))}
      </ul>
      <AddCategory onAddCategory={onAddCategory} />
    </div>
  );
};

export default Categories;
