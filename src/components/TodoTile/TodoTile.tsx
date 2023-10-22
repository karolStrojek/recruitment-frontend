import { MdCheck, MdClose, MdDelete } from "react-icons/md";
import { priorityType, todoStatesTypes } from "../../types/common";
import styles from "./TodoTile.module.scss";
import BackgroundTop from "../../assets/backgroundTop.png";
import { getBackgroundImage } from "./handlers";

export interface ITodoTile {
  text: string;
  priority: priorityType;
  isDone: boolean;
  setIsDone: (state: todoStatesTypes) => void;
  onDelete: () => void;
}

export const TodoTile = ({
  text,
  priority,
  isDone,
  setIsDone,
  onDelete,
}: ITodoTile) => {
  return (
    <li
      style={{ backgroundImage: `url(${BackgroundTop})` }}
      className={`${styles.wrapper} ${
        styles[`wrapper${priority.charAt(0).toUpperCase() + priority.slice(1)}`]
      }`}
    >
      {/* Button for changing state of todo */}
      <button
        className={styles.checkButton}
        onClick={() => {
          setIsDone(isDone ? "current" : "done");
        }}
      >
        {isDone ? <MdClose /> : <MdCheck />}
      </button>

      {/* Text of todo with striketrough option (without div it wasnt animated well) */}
      <div className={`${styles.taskText}`}>
        <span className={`${isDone ? styles.textStrike : styles.textNormal}`}>
          {text}
        </span>
      </div>

      {/* Block with image showing act priority of todo */}
      <div
        className={styles.priorityBackground}
        style={{
          backgroundImage: `url(${getBackgroundImage(priority)})`,
        }}
      ></div>

      {/* Todo delete button */}
      <button className={styles.deleteButton} onClick={onDelete}>
        <MdDelete />
      </button>
    </li>
  );
};
