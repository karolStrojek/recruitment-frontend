import React, { useDebugValue, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { priorityType, todoStatesTypes } from "../../types/common";
import { TodoTile } from "./TodoTile";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../redux/features/todosReducer";
import { onDeleteHandler, setIsDoneHandler } from "./handlers";

export interface ITodoTileFunctional {
  id: string;
  text: string;
  priority: priorityType;
  isDone: boolean;
}

export default ({ id, text, priority, isDone }: ITodoTileFunctional) => {
  const [localDone, setLocalDone] = useState<boolean>(isDone);
  const timeoutRef = useRef<null | NodeJS.Timeout>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalDone(isDone);
  }, [id]);

  return (
    <TodoTile
      text={text}
      priority={priority}
      isDone={localDone}
      setIsDone={(state) => {
        setIsDoneHandler(state, setLocalDone, dispatch, id, timeoutRef);
      }}
      onDelete={() => {
        onDeleteHandler(timeoutRef, dispatch, id);
      }}
    ></TodoTile>
  );
};
