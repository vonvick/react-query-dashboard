import React from "react";
import { render, screen } from "../test-utils";
import Navbar from "./Navbar";
import TextInput from "./TextInput";

test("it renders the navbar logo text correctly", async() => {
  render(<Navbar />);
  const logoText = await screen.findByText(/accurx dashboard/i);

  expect(logoText).toBeInTheDocument();
});

test("it renders the search box", async () => {
  render(
    <Navbar>
      <TextInput
        value=""
        inputType="text"
        handler={() => {}}
        placeholderText="enter word to search"
        ariaLabel="search-input" />
    </Navbar>
  );

  const searchInput = await screen.findByLabelText("search-input");

  expect(searchInput).toBeInTheDocument();
});
