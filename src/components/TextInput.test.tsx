import React from "react";
import {fireEvent, render, screen} from "../test-utils";
import TextInput, {InputTextInterface} from "./TextInput";

test("it renders the text input correctly", async () => {
  render(
    <TextInput
      value=""
      inputType="text"
      handler={() => {}}
      placeholderText="enter word to search"
      ariaLabel="text-input" />
  );

  const searchInput = await screen.findByLabelText("text-input");

  expect(searchInput).toBeInTheDocument();
});

test("it renders the correct type of input and value", async () => {
  render(
    <TextInput
      value=""
      inputType="number"
      handler={() => {}}
      placeholderText="enter a number"
      ariaLabel="number-input" />
  );

  const searchInput = await screen.findByLabelText("number-input");

  expect(searchInput).toHaveAttribute("type", "number");
});

test("it renders with the correct value", async () => {
  const inputProps: InputTextInterface = {
    value: "",
    inputType: "number",
    placeholderText: "enter a number",
    ariaLabel: "number-input"
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputProps.value = event.currentTarget.value
  };

  const { rerender } = render(
    <TextInput
      handler={inputHandler}
      {...inputProps} />
  );

  const numberInput = screen.getByLabelText("number-input");

  fireEvent.change(numberInput, { target: { value: 5 } });

  await rerender(<TextInput handler={inputHandler} {...inputProps}/>)

  // @ts-ignore
  expect(numberInput.value).toBe("5");
});
