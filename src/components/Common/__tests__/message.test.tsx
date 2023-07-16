import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Message from "../Message";
import React from "react";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("message notify", () => {
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
  it("should click buton Like and Dislike", () => {
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

    const payload = { title: "test", author: "test" };
    const likeAction = jest.fn();
    const dislikeAction = jest.fn();
    render(
      <Message
        payload={payload}
        likeAction={likeAction}
        dislikeAction={dislikeAction}
      />
    );
    const buttonLikeElement = screen.getByRole("button", { name: "like" });
    fireEvent.click(buttonLikeElement);
    expect(likeAction).toHaveBeenCalled();
    const buttonDislikeElement = screen.getByRole("button", {
      name: "dislike",
    });
    fireEvent.click(buttonDislikeElement);
    expect(dislikeAction).toHaveBeenCalled();
  });
});
