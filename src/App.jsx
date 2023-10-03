import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./App.module.css";
import Categories from "./components/Categories/Categories";
import Tasks from "./components/Tasks/Tasks";

function App() {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("taskList")) || []
  );
  const [activeCategory, setActiveCategory] = useState(data[0] || "");

  useEffect(
    function () {
      localStorage.setItem("taskList", JSON.stringify(data));
    },
    [data]
  );

  const handleAddCategory = (text) => {
    const newCategory = {
      title: text,
      id: uuidv4(),
      tasks: [],
    };
    setActiveCategory(newCategory);
    setData([...data, newCategory]);
  };

  const updData = (updActiveCategory) => {
    setData(
      data.map((item) =>
        item.id === updActiveCategory.id ? updActiveCategory : item
      )
    );
    setActiveCategory(updActiveCategory);
  };

  const handleEditCategory = (text) => {
    const updActiveCategory = { ...activeCategory, title: text };
    setData(
      data.map((item) => (item === activeCategory ? updActiveCategory : item))
    );
    setActiveCategory(updActiveCategory);
  };

  const handleDeleteCategory = () => {
    setData(data.filter((category) => category != activeCategory));
    setActiveCategory(data[0]);
  };

  const handleAddTask = (title, description) => {
    if (!title) return;
    const newTask = {
      id: uuidv4(),
      title,
      description,
      isCompleted: false,
    };
    setData(
      data.map((item) => {
        if (item === activeCategory) {
          item.tasks.push(newTask);
        }
        return item;
      })
    );
  };

  const handleEditTask = (task, title, description) => {
    if (!title) return;
    const updActiveCategory = {
      ...activeCategory,
      tasks: activeCategory.tasks.map((item) =>
        item === task ? { ...item, title, description } : item
      ),
    };
    updData(updActiveCategory);
  };

  const handleAddCompletedTask = (id) => {
    const updActiveCategory = {
      ...activeCategory,
      tasks: activeCategory.tasks.map((item) =>
        item.id === id ? { ...item, isCompleted: true } : item
      ),
    };

    updData(updActiveCategory);
  };

  const handleReturnCompletedTask = (id) => {
    const updActiveCategory = {
      ...activeCategory,
      tasks: activeCategory.tasks.map((item) =>
        item.id === id ? { ...item, isCompleted: false } : item
      ),
    };
    updData(updActiveCategory);
  };

  const handleDelTask = (id) => {
    const updActiveCategory = {
      ...activeCategory,
      tasks: activeCategory.tasks.filter((item) => item.id != id),
    };

    updData(updActiveCategory);
  };

  return (
    <main className={styles.app}>
      <Categories
        activeCategory={activeCategory}
        categories={data}
        onChangeCategory={setActiveCategory}
        onAddCategory={handleAddCategory}
      />
      {!!data.length && (
        <Tasks
          key={uuidv4()}
          onEditCategoryTitle={handleEditCategory}
          category={activeCategory}
          onDeleteCategory={handleDeleteCategory}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onAddCompletedTask={handleAddCompletedTask}
          onReturnCompletedTask={handleReturnCompletedTask}
          onDelTask={handleDelTask}
        />
      )}
    </main>
  );
}

export default App;
