import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { MdAdd, MdBookmark } from "react-icons/md";
import styles from "./InputPanel.module.scss";

export interface IInputPanel {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const InputPanel = forwardRef<any, IInputPanel>(
  ({ onSubmit }: IInputPanel, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const radioRef = useRef<HTMLInputElement>(null);

    //Use Imperative Handle to allow usage of two refs with one forward ref
    //Only logic thing that need to be in design component
    useImperativeHandle(
      ref,
      () => {
        return {
          removeValue: () => {
            if (inputRef.current) {
              inputRef.current.value = "";
            }
          },
          click: () => {
            if (radioRef.current) {
              radioRef.current.click();
            }
          },
        };
      },
      []
    );

    return (
      <form
        data-testid="data-form"
        className={styles.formWrapper}
        onSubmit={onSubmit}
      >
        <input
          data-testid="text-input"
          ref={inputRef}
          className={styles.textInput}
          name={"text"}
          type="text"
          placeholder="Enter new task"
        ></input>
        <div className={styles.flagWrapper}>
          <input
            data-testid="selected-radio"
            ref={radioRef}
            name={"radio"}
            id="low"
            value={"low"}
            type="radio"
          />
          <label htmlFor="low">
            <MdBookmark className={styles.lowMark} />
          </label>
          <input
            data-testid="mid-radio"
            name={"radio"}
            id="mid"
            value={"mid"}
            type="radio"
          />
          <label htmlFor="mid">
            <MdBookmark className={styles.midMark} />
          </label>
          <input name={"radio"} id="high" value={"high"} type="radio" />
          <label htmlFor="high">
            <MdBookmark className={styles.highMark} />
          </label>
        </div>
        <input id={"submit"} type="submit" />
        <label htmlFor="submit">
          <MdAdd />
        </label>
      </form>
    );
  }
);
