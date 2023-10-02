import styles from "./Task.module.scss";
import iconCheck from "../../assets/icons/check.svg";
import FormTask from "../FormTask/FormTask";

export default function Task({
  task,
  editableTask,
  setEditableTask,
  onEditTask,
  onAddCompletedTask,
}) {
  const isEditinTask = task === editableTask;

  const handleEditTask = (title, description) => {
    onEditTask(task, title, description);
    setEditableTask((prev) => !prev);
  };

  return (
    <li className={styles.task}>
      {isEditinTask ? (
        <FormTask
          onCancel={() => setEditableTask((prev) => !prev)}
          onSubmitForm={handleEditTask}
          titleTask={task.title}
          descriptionTask={task.description}
          id={task.id}
        />
      ) : (
        <div
          onClick={() => setEditableTask(task)}
          className={styles.taskContent}
        >
          <h3 className={styles.taskTitle}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                onAddCompletedTask(task.id);
              }}
              className={styles.taskDone}
            >
              <span className={styles.taskRadioBtn}></span>
              <span className={styles.taskIconBtn}>
                <img src={iconCheck} alt="" />
              </span>
            </div>
            <span>{task.title}</span>
          </h3>
          <p className={styles.taskDescription}>{task.description}</p>
        </div>
      )}
    </li>
  );
}
