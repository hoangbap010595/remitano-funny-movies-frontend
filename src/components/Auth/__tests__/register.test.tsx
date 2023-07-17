/* eslint-disable testing-library/no-unnecessary-act */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Register from "../Register";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("register test", () => {
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
  it("renders register component correctly", () => {
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
        <Register />
      </BrowserRouter>
    );
    const contentElement = screen.getByText("REMITANO");
    expect(contentElement).toBeInTheDocument();
  });

  it("typing into input form registration and click register", () => {
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
        <Register />
      </BrowserRouter>
    );
    const contentElement = screen.getByText("REMITANO");
    expect(contentElement).toBeInTheDocument();

    const inputUsernameElement =
      screen.getByPlaceholderText(/Enter you username/i);
    fireEvent.change(inputUsernameElement, {
      target: { value: "test" },
    });
    const usernameElement = screen.getByDisplayValue(/test/i);
    expect(usernameElement).toBeInTheDocument();

    const inputEmailElement = screen.getByPlaceholderText(/Enter your email/i);
    fireEvent.change(inputEmailElement, {
      target: { value: "test@gmail.com" },
    });
    const emailElement = screen.getByDisplayValue(/test@gmail.com/i);
    expect(emailElement).toBeInTheDocument();

    const inputPasswordElement =
      screen.getByPlaceholderText(/Enter your Password/i);
    fireEvent.change(inputPasswordElement, { target: { value: "secret@123" } });
    const passwordElement = screen.getByDisplayValue(/secret@123/i);
    expect(passwordElement).toBeInTheDocument();

    const inputCPasswordElement =
      screen.getByPlaceholderText(/Confirm Password/i);
    fireEvent.change(inputCPasswordElement, {
      target: { value: "secret@1234" },
    });
    const cPasswordElement = screen.getByDisplayValue(/secret@1234/i);
    expect(cPasswordElement).toBeInTheDocument();

    const buttonElement = screen.getByRole("button", { name: /Register/i });
    act(() => {
      fireEvent.click(buttonElement);
    });
  });
});
