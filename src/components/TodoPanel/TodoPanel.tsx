import React, { ChangeEvent, SetStateAction, forwardRef } from "react";
import styles from "./TodoPanel.module.scss";
import { todoType } from "../../types/common";
import InputPanel from "../InputPanel";
import BackgroundBottom from "../../assets/Background2.png";
import { TodoListName } from "./TodoListName";
import { TodoListSection } from "./TodoListSection";

interface ITodoPanel {
  editMode: boolean;
  listName: string;
  setEditMode: React.Dispatch<SetStateAction<boolean>>;
  todos: todoType[];
  showCurrent: boolean;
  showDone: boolean;
  doneHeight: string;
  currentHeight: string;
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickCattegory: (cat: string) => void;
}

export const TodoPanel = forwardRef<HTMLInputElement, ITodoPanel>(
  (
    {
      editMode,
      setEditMode,
      todos,
      showCurrent,
      showDone,
      onClickCattegory,
      doneHeight,
      currentHeight,
      onNameChange,
    },
    ref
  ) => {
    return (
      <section className={styles.wrapper}>
        {/* Component with name and option to change it */}
        <TodoListName
          ref={ref}
          editMode={editMode}
          setEditMode={setEditMode}
          onNameChange={onNameChange}
        />

        {/* Panel with todos - both done and current */}
        <div className={styles.taskPanel}>
          {/* Background */}
          <div
            className={styles.insideBackground}
            style={{ backgroundImage: `url(${BackgroundBottom})` }}
          ></div>

          {/* Section with todos */}
          <div className={styles.insideContent}>
            <TodoListSection
              todos={todos}
              onClickCattegory={onClickCattegory}
              show={showCurrent}
              state="current"
              listHeight={currentHeight}
            />
            <TodoListSection
              todos={todos}
              onClickCattegory={onClickCattegory}
              show={showDone}
              state="done"
              listHeight={doneHeight}
            />
          </div>
        </div>
        {/* Input form */}
        <InputPanel />
      </section>
    );
  }
);
