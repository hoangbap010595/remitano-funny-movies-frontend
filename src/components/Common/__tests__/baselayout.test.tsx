import { render, screen } from "@testing-library/react";
import BaseLayout from "../BaseLayout";
import React from "react";
import { io, Socket } from "socket.io-client";
import { useWS } from "../../../hooks/useWS";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("antd", () => {
  return {
    ...jest.requireActual("antd"),
    getPrefixCls: jest.fn().mockImplementation((prefix: string) => prefix),
  };
});

jest.mock("../../../hooks/useWS");

describe("BaseLayout", () => {
  beforeEach(() => {
    // authService.getCurrentUser.mockReturnValue({
    //   accessToken: "example-access-token",
    //   user: { email: "example-email@example.com" },
    // });
  });

  it("renders BaseLayout component correctly", () => {
    render(<BaseLayout>Hello World!</BaseLayout>);
    const contentElement = screen.getByText("Hello World!");
    expect(contentElement).toBeInTheDocument();
  });

  it("connects to websocket and emits INIT event", () => {
    // const socket: Socket = io("http://localhost:3003");
    // const mockOn = jest.fn();
    // const mockEmit = jest.fn();
    // const theme = jest.fn();
    // jest.spyOn(React, "useEffect").mockImplementation((effect) => effect());
    // jest.spyOn(React, "useContext").mockReturnValue({ emit: mockEmit });

    // useWS.mockReturnValue({
    //   on: mockOn,
    //   emit: mockEmit,
    //   off: jest.fn(),
    // });

    // socket.on = mockOn;
    // render(<BaseLayout>Hello World!</BaseLayout>);

    // // expect(mockOn).toHaveBeenCalledWith("connect", expect.any(Function));
    // // expect(mockEmit).toHaveBeenCalledWith("events", {
    // //   action: "INIT",
    // //   payload: { token: "example-access-token" },
    // // });

    // socket.close();
  });

  // Add more test cases to cover different scenarios and functionality of BaseLayout
});
