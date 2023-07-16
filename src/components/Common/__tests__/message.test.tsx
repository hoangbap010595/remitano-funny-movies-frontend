import { render, screen, fireEvent } from "@testing-library/react";
import Message from "../Message";

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
  it("renders message norify component correctly", () => {
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
    const contentElement = screen.getByText("A new video has been shared");
    expect(contentElement).toBeInTheDocument();
  });

  it("should click buton Like and Dislike", () => {
    const payload = { title: "test", author: "test" };
    const likeAction = jest.fn((a: string) => {});
    const dislikeAction = jest.fn((a: string) => {});

    render(
      <Message
        payload={payload}
        likeAction={likeAction}
        dislikeAction={dislikeAction}
      />
    );

    const buttonLikeElement = screen.getByRole("button", { name: "Like" });
    fireEvent.click(buttonLikeElement);
    expect(likeAction).toHaveBeenCalled();

    const buttonDislikeElement = screen.getByRole("button", {
      name: "Dislike",
    });
    fireEvent.click(buttonDislikeElement);
    expect(dislikeAction).toHaveBeenCalled();
  });
});
