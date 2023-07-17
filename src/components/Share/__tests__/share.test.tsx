import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Share from "../index";
import { BrowserRouter } from "react-router-dom";
import { useWS } from "../../../hooks/useWS";
import { Socket } from "socket.io-client";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("socket.io-client");
jest.mock("../../../hooks/useWS");

describe("share test", () => {
  let socket: Socket;

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

    (useWS as jest.Mock).mockReturnValue({
      emit: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
      close: jest.fn(),
    });
    socket = useWS();
  });
  afterAll(() => {
    cleanup();
    socket.close();
  });
  it("renders share component correctly", () => {
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
        <Share />
      </BrowserRouter>
    );
    const contentElement = screen.getByText("Share a Youtube movie");
    expect(contentElement).toBeInTheDocument();
  });

  it("typing into input youtube url and click share", async () => {
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
    const mockEmit = jest.fn();
    (useWS as jest.Mock).mockReturnValue({
      emit: mockEmit,
      on: jest.fn(),
      off: jest.fn(),
      close: jest.fn(),
    });
    render(
      <BrowserRouter basename="/">
        <Share />
      </BrowserRouter>
    );

    const contentElement = screen.getByText("Share a Youtube movie");
    expect(contentElement).toBeInTheDocument();

    const youtubeUrl = "abcd1234";
    const inputUrlElement = screen.getByPlaceholderText(
      /Enter your youtube url/i
    );
    fireEvent.change(inputUrlElement, {
      target: { value: youtubeUrl },
    });
    const urlElement = screen.getByDisplayValue(/abcd1234/i);
    expect(urlElement).toBeInTheDocument();

    const buttonElement = screen.getByRole("button", { name: "Share" });
    fireEvent.click(buttonElement);
    // console.log(buttonElement);

    // Send data to the server
    const expectedEventData = {
      action: "SHARE_VIDEO",
      payload: { link: youtubeUrl },
    };
    await waitFor(() => {
      expect(mockEmit).toHaveBeenCalledWith("events", expectedEventData);
    });
  });
});
