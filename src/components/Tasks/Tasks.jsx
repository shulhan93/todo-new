import Task from "../Task/Task";
import styles from "./Tasks.module.scss";
import iconMore from "../../assets/icons/more.svg";
import iconDel from "../../assets/icons/delete.svg";
import iconArrow from "../../assets/icons/arrow.svg";
import iconEdit from "../../assets/icons/edit.svg";
import { useState } from "react";
import FormTask from "../FormTask/FormTask";
import CompletedTask from "../CompletedTask/CompletedTask";

export default function Tasks({
  category,
  onEditCategoryTitle,
  onDeleteCategory,
  onAddTask,
  onEditTask,
  onAddCompletedTask,
  onReturnCompletedTask,
  onDelTask,
}) {
  const [text, setText] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editableTask, setEditableTask] = useState(null);
  const [showCompletedList, setShowCompletedList] = useState(false);
  const countCompletedTask = category.tasks.reduce(
    (acc, i) => (i.isCompleted ? ++acc : acc),
    0
  );

  const cancelToAddTask = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className={styles.tasks}>
      <h2 className={styles.title}>
        {!showEdit ? (
          <span>{category.title}</span>
        ) : (
          <div className={styles.editing}>
            <input
              autoFocus
              value={text}
              onKeyDown={(e) =>
                e.key === "Enter" ? onEditCategoryTitle(text) : ""
              }
              onChange={(e) => setText(e.target.value)}
              onBlur={(e) => {
                if (e.relatedTarget?.className === styles.iconPlus) {
                  return;
                } else {
                  setShowEdit((prev) => !prev);
                  setText("");
                }
              }}
              type="text"
            />
            <button
              onClick={() => {
                onEditCategoryTitle(text);
                setShowEdit(false);
              }}
              className={styles.iconPlus}
            >
              +
            </button>
          </div>
        )}

        <button
          onClick={() => setShowModal(!showModal)}
          className={styles.btnShowModal}
        >
          <img src={iconMore} alt="" />
        </button>

        {showModal && (
          <div className={styles.modal}>
            <button
              onClick={() => {
                setShowEdit((prev) => !prev);
                setText(category.title);
                setShowModal((prev) => !prev);
              }}
              className={styles.btnModal}
            >
              <img src={iconEdit} alt="" />
              <span>Rename list</span>
            </button>
            <button onClick={onDeleteCategory} className={styles.btnModal}>
              <img src={iconDel} alt="" />
              <span>Delete list</span>
            </button>
          </div>
        )}
      </h2>

      <div className={styles.addTaskContainer}>
        <button
          onClick={() => {
            setShowForm(!showForm);
          }}
          className={styles.addTask}
        >
          <span>+</span> add task
        </button>
        {showForm && (
          <FormTask onCancel={cancelToAddTask} onSubmitForm={onAddTask} />
        )}
      </div>

      <ul className={styles.tasksList}>
        {!category
          ? "not"
          : category.tasks.map((item, i) =>
              !item.isCompleted ? (
                <Task
                  key={i}
                  task={item}
                  setEditableTask={setEditableTask}
                  editableTask={editableTask}
                  onEditTask={onEditTask}
                  showForm={showForm}
                  onAddCompletedTask={onAddCompletedTask}
                />
              ) : (
                ""
              )
            )}
      </ul>
      {!!countCompletedTask && (
        <div className={styles.completedTasks}>
          <p
            className={`${styles.completedTasksCount} ${
              showCompletedList ? styles.open : ""
            }`}
            onClick={() => setShowCompletedList((prev) => !prev)}
          >
            <span>Completed ({countCompletedTask})</span>
            <img src={iconArrow} alt="" />
          </p>

          {showCompletedList && (
            <ul className="completedList">
              {category.tasks.map((el, i) =>
                el.isCompleted ? (
                  <CompletedTask
                    onReturnCompletedTask={onReturnCompletedTask}
                    onDelTask={onDelTask}
                    key={i}
                    title={el.title}
                    id={el.id}
                  />
                ) : (
                  ""
                )
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
