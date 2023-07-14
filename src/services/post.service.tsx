import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:3000/graphql";

class PostService {
  getPublishedPosts(after: string) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          API_URL,
          {
            query: `query
            {
                publishedPosts(first: 5, after: "${after}", orderBy: { field: createdAt, direction: desc }) {
                    totalCount
                    edges {
                        cursor
                        node {
                            id
                            title
                            content
                            link
                            author {
                                id
                                username
                            }
                        }
                    }
                    pageInfo {
                        startCursor
                        endCursor
                        hasNextPage
                        hasPreviousPage
                    }
                }
            }`,
          },
          {
            headers: {
              ...authHeader,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  }
}
var postService = new PostService();
export default postService;
