import styles from "./CompletedTask.module.scss";
import icon from "../../assets/icons/check.svg";
import iconDel from "../../assets/icons/delete.svg";

const CompletedTask = ({ title, onReturnCompletedTask, id, onDelTask }) => {
  return (
    <li className={styles.task}>
      <span
        onClick={() => onReturnCompletedTask(id)}
        className={styles.taskBtn}
      >
        <img src={icon} alt="" />
      </span>
      <span className={styles.taskTitle}>{title}</span>
      <span onClick={() => onDelTask(id)} className={styles.taskDel}>
        <img src={iconDel} alt="" />
      </span>
    </li>
  );
};

export default CompletedTask;
