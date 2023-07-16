import axios from "axios";
import authHeader from "./auth-header";
const { REACT_APP_API_URL } = process.env;
const APP_API = REACT_APP_API_URL || "";

class PostService {
  getPublishedPosts(after: string) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          APP_API,
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
                                email
                            }
                            postLikes {
                                type
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
