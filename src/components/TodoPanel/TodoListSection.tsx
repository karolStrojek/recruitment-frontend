import { MdArrowForwardIos } from "react-icons/md";
import { todoStatesTypes, todoType } from "../../types/common";
import TodoTile from "../TodoTile";
import styles from "./TodoPanel.module.scss";

interface ITodoListSection {
  todos: todoType[];
  onClickCattegory: (cat: string) => void;
  show: boolean;
  listHeight: string;
  state: todoStatesTypes;
}

export const TodoListSection = ({
  todos,
  onClickCattegory,
  show,
  listHeight,
  state,
}: ITodoListSection) => {
  //Single section of todos (simple to add more)
  return (
    <>
      <button
        onClick={() => {
          onClickCattegory(state);
        }}
      >
        {state.toUpperCase()}
        <MdArrowForwardIos
          className={show ? styles.arrowDown : styles.arrowUp}
        />
      </button>
      <ul
        style={{ height: show ? listHeight : "0px" }}
        className={`${styles.taskList} ${
          show ? styles.listOpen : styles.listClosed
        }`}
      >
        {todos
          .filter((el) => el.state === state)
          .map((el) => (
            <TodoTile
              text={el.text}
              priority={el.priority}
              id={el.id}
              isDone={el.state === "done"}
            ></TodoTile>
          ))}
      </ul>
    </>
  );
};
