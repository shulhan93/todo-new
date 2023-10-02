import React, { useState } from "react";
import styles from "./AddCategory.module.scss";

export default function AddCategory({ onAddCategory }) {
  const [text, setText] = useState("");
  const [showInput, setShowInput] = useState(false);

  const addCategory = () => {
    if (!text) return;
    onAddCategory(text);
    setText("");
    setShowInput(false);
  };

  return (
    <div className={styles.container}>
      {!showInput && (
        <button onClick={() => setShowInput((prev) => !prev)}>
          <span className={styles.iconPlus}>+</span> add category
        </button>
      )}
      {showInput && (
        <div className={styles.addCategory}>
          <input
            onBlur={(e) => {
              if (e.relatedTarget?.className === styles.addCategoryBtn) {
                return;
              } else {
                setShowInput((prev) => !prev);
                setText("");
              }
            }}
            autoFocus
            onKeyDown={(e) => (e.key === "Enter" ? addCategory() : "")}
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
          />
          <button
            className={styles.addCategoryBtn}
            type="submit"
            onSubmit={addCategory}
            onClick={addCategory}
          >
            <span>+</span>
          </button>
        </div>
      )}
    </div>
  );
}
