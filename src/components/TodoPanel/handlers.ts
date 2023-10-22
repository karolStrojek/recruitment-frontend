import { todoType } from "../../types/common";

export const calculateListHeightsHandler = (
  todos: todoType[],
  singleHeight: number
) => {
  const doneHeight =
    todos.filter((el) => el.state === "done").length * singleHeight;

  const currentHeight =
    todos.filter((el) => el.state === "current").length * singleHeight;

  return [`${doneHeight}rem`, `${currentHeight}rem`];
};
