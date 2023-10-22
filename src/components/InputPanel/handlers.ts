import { Dispatch } from "react";
import { priorityType } from "../../types/common";
import { AnyAction } from "@reduxjs/toolkit";
import { addTodo } from "../../redux/features/todosReducer";

export const onSubmitHandler = (
  formEvent: React.FormEvent<HTMLFormElement>,
  dispatch: Dispatch<AnyAction>,
  inputRef: React.MutableRefObject<any>
) => {
  formEvent.preventDefault();
  const newFormData = new FormData(formEvent.target as HTMLFormElement);
  const textValue = newFormData.get("text")?.toString();
  const radioValue = newFormData.get("radio")?.toString() as priorityType;

  if (textValue && radioValue) {
    dispatch(
      addTodo({
        id: Math.floor(Math.random() * Date.now()).toString(16),
        text: textValue,
        priority: radioValue,
        state: "current",
      })
    );

    if (inputRef.current) {
      inputRef.current.removeValue();
    }
  }
};
