/* eslint-disable testing-library/no-unnecessary-act */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Login from "../Login";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("login test", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  afterAll(() => {
    cleanup();
  });
  it("renders login component correctly", () => {
    jest.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      media: "",
      onchange: null,
      addListener: jest.fn(), // Use the mock implementation
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
    render(
      <BrowserRouter basename="/">
        <Login />
      </BrowserRouter>
    );
    const contentElement = screen.getByText("REMITANO");
    expect(contentElement).toBeInTheDocument();
  });

  it("typing into input email and passsword and click login", async () => {
    jest.spyOn(window, "matchMedia").mockReturnValue({
      matches: false,
      media: "",
      onchange: null,
      addListener: jest.fn(), // Use the mock implementation
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
    render(
      <BrowserRouter basename="/">
        <Login />
      </BrowserRouter>
    );
    const contentElement = screen.getByText("REMITANO");
    expect(contentElement).toBeInTheDocument();

    const inputEmailElement = screen.getByPlaceholderText(/Enter your email/i);
    fireEvent.change(inputEmailElement, {
      target: { value: "test@gmail.com" },
    });
    const emailElement = screen.getByDisplayValue(/test@gmail.com/i);
    expect(emailElement).toBeInTheDocument();

    const inputPasswordElement = screen.getByPlaceholderText(/Password/i);
    fireEvent.change(inputPasswordElement, { target: { value: "secret@123" } });
    const passwordElement = screen.getByDisplayValue(/secret@123/i);
    expect(passwordElement).toBeInTheDocument();

    const buttonElement = screen.getByRole("button", { name: /Log in/i });

    await act(() => {
      fireEvent.click(buttonElement);
    });

    expect(contentElement).toBeInTheDocument();
  });
});
