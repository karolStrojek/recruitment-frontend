import { useEffect, useRef } from "react";
import { InputPanel } from "./InputPanel";
import { useDispatch } from "react-redux";
import { onSubmitHandler } from "./handlers";

export default () => {
  const dispatch = useDispatch();
  const inputRef = useRef<any | null>(null);

  //Make sure that at least one flag is selected
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  return (
    <InputPanel
      ref={inputRef}
      onSubmit={(formEvent) => {
        onSubmitHandler(formEvent, dispatch, inputRef);
      }}
    ></InputPanel>
  );
};
