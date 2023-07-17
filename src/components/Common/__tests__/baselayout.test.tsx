import { render, screen, waitFor } from "@testing-library/react";
import BaseLayout from "../BaseLayout";
import { Socket, io } from "socket.io-client";
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

jest.mock("socket.io-client");
jest.mock("../../../hooks/useWS");

describe("BaseLayout", () => {
  let socket: Socket;
  beforeEach(() => {
    (useWS as jest.Mock).mockReturnValue({
      emit: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
      close: jest.fn(),
    });
    socket = useWS();
  });
  afterAll(() => {
    socket?.close();
  });

  it("renders BaseLayout component correctly", async () => {
    render(<BaseLayout>Show children component!</BaseLayout>);
    const contentElement = screen.getByText("Show children component!");
    await waitFor(() => {
      expect(contentElement).toBeInTheDocument();
    });
  });

  it("connects to websocket and emits INIT event", async () => {
    const eventData = {
      action: "INIT",
      payload: { token: undefined },
    };
    const mockOn = jest.fn();
    const mockEmit = jest.fn(() => eventData);

    (socket.on as jest.Mock).mockImplementation(mockOn);
    (socket.emit as jest.Mock).mockImplementation(mockEmit);

    render(<BaseLayout>Testing websocket!</BaseLayout>);

    await waitFor(() => {
      expect(mockOn).toHaveBeenCalledWith("connect", expect.any(Function));
    });

    const [, eventFunction] = mockOn.mock.calls.find(
      ([eventName]) => eventName === "connect"
    );
    eventFunction();

    await waitFor(() => {
      expect(mockEmit).toHaveBeenCalledWith("events", eventData);
    });
  });
});
