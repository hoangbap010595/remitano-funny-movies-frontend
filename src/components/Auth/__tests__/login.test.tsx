import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Login from "../Login";
import { BrowserRouter } from "react-router-dom";

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
});
