import { render, screen, fireEvent } from "@testing-library/react";
import AppHeader from "../Header";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("header", () => {
  it("renders AppHeader component correctly", () => {
    render(<AppHeader />);
    const contentElement = screen.getByText("Welcome");
    expect(contentElement).toBeInTheDocument();
  });

  it("should click buton Logout", () => {
    render(<AppHeader />);

    const buttonLogoutElement = screen.getByRole("button", { name: "logout Logout" });
    fireEvent.click(buttonLogoutElement);
  });

  it("should click buton Share a movie", () => {
    render(<AppHeader />);

    const buttonShareAMovieElement = screen.getByRole("button", { name: "share-alt Share a movie" });
    fireEvent.click(buttonShareAMovieElement);
  });
});
