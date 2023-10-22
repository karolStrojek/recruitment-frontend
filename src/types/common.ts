export type priorityType = "low" | "mid" | "high";
export type todoStatesTypes = "current" | "done";

export type todoType = {
  id: string;
  text: string;
  state: todoStatesTypes;
  priority: priorityType;
};
