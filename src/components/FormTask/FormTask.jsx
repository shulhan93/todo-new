import { useState } from "react";
import styles from "./FormTask.module.scss";

const FormTask = ({
  onCancel,
  onSubmitForm,
  titleTask = "",
  descriptionTask = "",
  id = "",
}) => {
  const [title, setTitle] = useState(titleTask);
  const [details, setDetails] = useState(descriptionTask);

  const handleForm = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleForm} className={styles.form}>
      <label className={styles.formItem}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task"
          type="text"
        />
      </label>
      <label className={styles.formItem}>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Details"
        ></textarea>
      </label>
      <div className={styles.formBtns}>
        <button
          onClick={() => onSubmitForm(title, details, id)}
          type="submit"
          className={styles.formBtn}
        >
          add
        </button>
        <button onClick={onCancel} className={styles.formBtn}>
          cancel
        </button>
      </div>
    </form>
  );
};

export default FormTask;
