import axios from "axios";
import authService from "../auth.service";

jest.mock("axios");

describe("AuthService", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("login", () => {
    it("should make a POST request with the correct data", async () => {
      const username = "testuser001";
      const password = "1234556";
      const responseData = {
        accessToken: "token1234556",
        user: {
          id: 1,
          username: "testuser",
          email: "test@example.com",
          firstname: "Hoang",
          lastname: "Le",
        },
      };

      (axios.post as jest.Mock).mockResolvedValue({ data: responseData });

      const result = await authService.login(username, password);

      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        {
          query: expect.any(String),
        },
        expect.any(Object)
      );

      const postData = (axios.post as jest.Mock).mock.calls[0][1];

      expect(postData.query).toContain(`mutation`);
      expect(postData.query).toContain(`login`);
      expect(postData.query).toContain(username);
      expect(postData.query).toContain(password);

      expect(result).toEqual(responseData);
    });

    it("should reject the promise if the request fails", async () => {
      const username = "testuser001";
      const password = "1234556";

      const errorMessage = "Request failed";
      (axios.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(authService.login(username, password)).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe("register", () => {
    it("should make a POST request with the correct data", async () => {
      const username = "testuser001";
      const password = "1234556";
      const firstname = "Hoang";
      const lastname = "Le";
      const email = "test@gmail.com";

      const responseData = {
        accessToken: "token1234556",
        user: {
          id: 1,
          username: "testuser",
          email: "test@example.com",
          firstname: "Hoang",
          lastname: "Le",
        },
      };

      (axios.post as jest.Mock).mockResolvedValue({ data: responseData });

      const result = await authService.register(
        firstname,
        lastname,
        username,
        email,
        password
      );

      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        {
          query: expect.any(String),
        },
        expect.any(Object)
      );

      const postData = (axios.post as jest.Mock).mock.calls[0][1];

      expect(postData.query).toContain(`mutation`);
      expect(postData.query).toContain(`signup`);
      expect(postData.query).toContain(username);
      expect(postData.query).toContain(password);

      expect(result).toEqual(responseData);
    });

    it("should reject the promise if the request fails", async () => {
      const username = "testuser001";
      const password = "1234556";
      const firstname = "Hoang";
      const lastname = "Le";
      const email = "test@gmail.com";

      const errorMessage = "Request failed";
      (axios.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(
        authService.register(firstname, lastname, username, email, password)
      ).rejects.toThrow(errorMessage);
    });
  });
});
