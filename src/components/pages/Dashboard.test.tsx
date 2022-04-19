import React from "react";
import { setupServer } from "msw/node";
import { render, waitFor, screen, fireEvent } from "../../test-utils";
import { handlers } from "../../mocks/handler";
import patientsData from "../../test-helpers/patients-data.json";

import App from "../../App";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("it renders the text 'Patients Vaccine Record'", async() => {
  render(<App />);
  await screen.findByRole('heading');

  expect(screen.getByRole('heading')).toHaveTextContent('Patients Vaccine Record');
});

test("it renders all 25 patients record table rows", async () => {
  render(<App />);

  await screen.findByText(/Gelato/i);

  for (let i = 0; i < patientsData.length; i++) {
    const name = patientsData[i].firstName
    expect(screen.getByText(new RegExp(`${name}`, "i"))).toBeInTheDocument();
  }
});

test("it renders patient's record based on search parameters", async() => {
  render(<App />);
  const searchInput = screen.getByLabelText("patient-search-input");

  fireEvent.change(searchInput, { target: { value: "astra" } });

  await waitFor(async () => {
    expect(screen.queryByText(/pfizer/i)).not.toBeInTheDocument();
  })
});

test("it renders 'No data found' when no record exists", async() => {
  render(<App />);
  const searchInput = screen.getByLabelText("patient-search-input");

  fireEvent.change(searchInput, { target: { value: "astrateyrsd" } });

  await waitFor(async () => {
    expect(screen.queryByText(/pfizer/i)).not.toBeInTheDocument();
  });
  await waitFor(async () => {
    expect(screen.queryByText(/astrazeneca/i)).not.toBeInTheDocument();
  });
  await waitFor(async () => {
    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
  });
});

