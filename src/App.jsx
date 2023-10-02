import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./App.module.css";
import Categories from "./components/Categories/Categories";
import Tasks from "./components/Tasks/Tasks";

const tasks = [
  {
    title: "Все",
    id: uuidv4(),
    tasks: [
      {
        id: uuidv4(),
        title: "Купить что то 1",
        description: "Какое то описание",
        isCompleted: false,
      },

      {
        id: uuidv4(),
        title: "Купить что то 12",
        description: "Какое то описание2",
        isCompleted: true,
      },

      {
        id: uuidv4(),
        title: "Купить что то 1www2",
        description: "Какое то описsdsdание2",
        isCompleted: true,
      },
    ],
  },
  {
    title: "Книги",
    id: uuidv4(),
    tasks: [
      {
        id: uuidv4(),
        title: "Почитать что то 1",
        description: "Какое то описание",
        isCompleted: false,
      },
      {
        id: uuidv4(),
        title: "Почитать что то 2",
        description: "Какое то описание",
        isCompleted: false,
      },
    ],
  },
];

function App() {
  const [data, setData] = useState(tasks);
  const [activeCategory, setActiveCategory] = useState(data[0] || "");

  const handleAddCategory = (text) => {
    const newCategory = {
      title: text,
      id: uuidv4(),
      tasks: [],
    };
    setActiveCategory(newCategory);
    setData([...data, newCategory]);
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
    const updActiveCategory = {
      ...activeCategory,
      tasks: activeCategory.tasks.map((item) =>
        item === task ? { ...item, title, description } : item
      ),
    };

    setData(
      data.map((item) =>
        item.id === updActiveCategory.id ? updActiveCategory : item
      )
    );
    setActiveCategory(updActiveCategory);
  };

  const handleAddCompletedTask = (id) => {
    const updActiveCategory = {
      ...activeCategory,
      tasks: activeCategory.tasks.map((item) =>
        item.id === id ? { ...item, isCompleted: true } : item
      ),
    };

    setData(
      data.map((item) =>
        item.id === updActiveCategory.id ? updActiveCategory : item
      )
    );
    setActiveCategory(updActiveCategory);
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
        />
      )}
    </main>
  );
}

export default App;
