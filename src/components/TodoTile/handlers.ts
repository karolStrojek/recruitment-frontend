import { priorityType, todoStatesTypes } from "../../types/common";
import lowPriority from "../../assets/lorPriority.png";
import midPriority from "../../assets/midPriority.png";
import highPriority from "../../assets/highPriority.png";
import { changeState, deleteTodo } from "../../redux/features/todosReducer";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";

//Select background name based on tile priority
export const getBackgroundImage = (priority: priorityType) => {
  switch (priority) {
    case "high":
      return highPriority;
    case "mid":
      return midPriority;
    case "low":
      return lowPriority;
  }
};

/*Handler changing local state on click action, 
waiting one second to change todo state in redux store*/
export const setIsDoneHandler = (
  state: todoStatesTypes,
  setLocalDone: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch: Dispatch<AnyAction>,
  id: string,
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
) => {
  setLocalDone(state === "current" ? false : true);
  const timer = setTimeout(() => {
    dispatch(changeState({ id, state: state }));
  }, 1000);
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
  timeoutRef.current = timer;
};

/*Delete todo tile on click action - make sure to stop todo state change*/
export const onDeleteHandler = (
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
  dispatch: Dispatch<AnyAction>,
  id: string
) => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
  dispatch(deleteTodo(id));
};
