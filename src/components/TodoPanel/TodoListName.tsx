import { ChangeEvent, SetStateAction, forwardRef } from "react";
import styles from "./TodoPanel.module.scss";
import { MdEdit, MdEditOff } from "react-icons/md";

interface ITodoListName {
  editMode: boolean;
  setEditMode: React.Dispatch<SetStateAction<boolean>>;
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TodoListName = forwardRef<HTMLInputElement, ITodoListName>(
  ({ editMode, setEditMode, onNameChange }, ref) => {
    //Component with todo list name (with option to input new)

    return (
      <div className={styles.listName}>
        <input
          placeholder="Enter list name"
          disabled={!editMode}
          onBlur={() => {
            setEditMode(false);
          }}
          onChange={onNameChange}
          ref={ref}
        ></input>
        <button
          onClick={() => {
            setEditMode(!editMode);
          }}
        >
          {editMode ? <MdEditOff /> : <MdEdit />}
        </button>
      </div>
    );
  }
);
