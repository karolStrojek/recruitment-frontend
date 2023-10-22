import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TodoPanel } from "./TodoPanel";
import { setListName } from "../../redux/features/todosReducer";
import { calculateListHeightsHandler } from "./handlers";

export default () => {
  //Use State Hooks
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showCurrent, setShowCurrent] = useState<boolean>(true);
  const [showDone, setShowDone] = useState<boolean>(true);

  //Redux hooks
  const { listName, todos } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  //Ref hooks
  const nameRef = useRef<HTMLInputElement | null>(null);

  //Use Memo
  const [doneHeight, currentHeight] = useMemo(() => {
    return calculateListHeightsHandler(todos, 5.6);
  }, [todos]);

  //Use Effects
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.value = listName;
    }
  }, []);

  useEffect(() => {
    if (editMode && nameRef.current) {
      nameRef.current.value = listName;
    }
  }, [editMode]);

  return (
    <TodoPanel
      ref={nameRef}
      editMode={editMode}
      listName={listName}
      setEditMode={setEditMode}
      todos={todos}
      showCurrent={showCurrent}
      showDone={showDone}
      doneHeight={doneHeight}
      currentHeight={currentHeight}
      onNameChange={(e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setListName(e.target.value));
      }}
      onClickCattegory={(cat) => {
        if (cat === "done") {
          setShowDone(!showDone);
        } else {
          setShowCurrent(!showCurrent);
        }
      }}
    ></TodoPanel>
  );
};
