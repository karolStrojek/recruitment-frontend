import { fireEvent, render, screen, store } from "../../../utils/test-utils";
import InputPanel from "../../../components/InputPanel";

describe("Testing Input Panel Component", () => {
  test("Check if component renders", () => {
    render(<InputPanel />);
    expect(screen.getByTestId("data-form")).toBeInTheDocument();
  });

  test("Expect low radio button to be selected", () => {
    render(<InputPanel />);
    expect(screen.getByTestId("selected-radio").checked).toEqual(true);
  });

  test("Check if text field is working properly", () => {
    const inputText = "Test text";
    render(<InputPanel />);
    const input = screen.getByTestId("text-input");
    const form = screen.getByTestId("data-form");
    fireEvent.change(input, { target: { value: inputText } });
    expect(input.value).toBe(inputText);
    const formData = new FormData(form);
    expect(formData.get("text").toString()).toBe(inputText);
  });

  test("Check if radio buttons working properly", () => {
    render(<InputPanel />);
    const form = screen.getByTestId("data-form");
    const allButtons = screen.getAllByRole("radio");
    const selectedButton = allButtons.filter((el) => el.checked === true);
    expect(selectedButton.length).toBe(1);
    const nonSelectedButtons = allButtons.filter((el) => el.checked !== true);
    expect(nonSelectedButtons.length).toBe(2);

    fireEvent.click(nonSelectedButtons[0]);
    expect(nonSelectedButtons[0].checked).toBe(true);
    expect(selectedButton[0].checked).toBe(false);
    const formData = new FormData(form);
    expect(formData.get("radio").toString()).toBe(nonSelectedButtons[0].value);
  });

  test("Check if form submit working as expected", () => {
    render(<InputPanel />);
    const form = screen.getByTestId("data-form");
    const allButtons = screen.getAllByRole("radio");
    const input = screen.getByTestId("text-input");
    const randomClick = Math.floor(Math.random() * 3);
    const inputText = "Some Text";
    fireEvent.click(allButtons[randomClick]);
    fireEvent.change(input, { target: { value: inputText } });

    fireEvent.submit(form);
    const actStore = store.getState("todo").todo.todos;
    expect(actStore.length).toBeGreaterThan(0);
    expect(actStore[actStore.length - 1].text).toBe(inputText);
    expect(actStore[actStore.length - 1].state).toBe("current");
    expect(actStore[actStore.length - 1].priority).toBe(
      allButtons[randomClick].value
    );
  });
});
