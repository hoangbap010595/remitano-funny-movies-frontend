import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import Message from "../Message";
import React from "react";
import { useWS } from "../../../hooks/useWS";
import { Socket } from "socket.io-client";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("socket.io-client");
jest.mock("../../../hooks/useWS");

describe("message notify", () => {
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
  it("should click buton Like and Dislike", async () => {
    const reactChose = "",
      setReactChose = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementation(() => [reactChose, setReactChose]);
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
    (socket.emit as jest.Mock).mockImplementation(mockEmit);
    const payload = { title: "test", author: "test", postId: "post-id-test" };
    // like
    const likeEventData = {
      action: "LIKE_POST",
      payload: { type: "LIKE", postId: payload.postId },
    };
    const dislikeEventData = {
      action: "DISLIKE_POST",
      payload: { type: "DISLIKE", postId: payload.postId },
    };

    const likeAction = () => {
      mockEmit("events", likeEventData);
    };
    const dislikeAction = () => {
      mockEmit("events", dislikeEventData);
    };
    render(
      <Message
        payload={payload}
        likeAction={likeAction}
        dislikeAction={dislikeAction}
      />
    );

    // Click butotn Like
    const buttonLikeElement = screen.getByRole("button", { name: "like" });
    fireEvent.click(buttonLikeElement);
    // Send data to the server
    await waitFor(() => {
      expect(mockEmit).toHaveBeenCalledWith("events", likeEventData);
    });

    // Click butotn Dislike
    const buttonDislikeElement = screen.getByRole("button", {
      name: "dislike",
    });
    fireEvent.click(buttonDislikeElement);
    // Send data to the server
    await waitFor(() => {
      expect(mockEmit).toHaveBeenCalledWith("events", dislikeEventData);
    });
  });
});
