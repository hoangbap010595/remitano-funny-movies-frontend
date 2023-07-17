import axios from "axios";
import postService from "../post.service";
import { PostDataType } from "../../common/app-model";

jest.mock("axios");

describe("PostService", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getPublishedPosts", () => {
    it("should make a POST request with the correct data and headers", async () => {
      const after = "";
      const responseData: PostDataType = {
        totalCount: 10,
        edges: [
          {
            loading: true,
            cursor: "x9sa8s0asd8g7g009g82g",
            node: {
              id: "1",
              title: "This is title of Post",
              content: "This is content of the post",
              link: "https://example.com",
              author: {
                id: "1",
                username: "testuser",
                email: "test@example.com",
              },
              postLikes: [
                {
                  type: "LIKE",
                },
              ],
            },
          },
        ],
        pageInfo: {
          startCursor: "x9sa8s0asd8g7g009g82g",
          endCursor: "asdfoaisjfoasijdf8230g",
          hasNextPage: true,
          hasPreviousPage: false,
        },
      };

      (axios.post as jest.Mock).mockResolvedValue({ data: responseData });
      const result = await postService.getPublishedPosts(after);

      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          query: expect.any(String),
        }),
        expect.objectContaining({
          headers: {
            "Content-Type": "application/json",
          },
        })
      );

      //   console.log((axios.post as jest.Mock).mock.calls);
      console.log(result);
      console.log(responseData);
      const postData = (axios.post as jest.Mock).mock.calls[0][1];

      expect(postData.query).toContain(`query`);
      expect(postData.query).toContain(`publishedPosts`);
      expect(postData.query).toContain(after);

      expect(result).toEqual(responseData);
    });

    it("should reject the promise if the request fails", async () => {
      const after = "asdfoaisjfoasijdf8230g";

      const errorMessage = "Request failed";
      (axios.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(postService.getPublishedPosts(after)).rejects.toThrow(
        errorMessage
      );
    });
  });
});
