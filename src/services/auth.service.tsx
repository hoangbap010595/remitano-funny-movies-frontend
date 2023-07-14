import axios from "axios";

const API_URL = "http://localhost:3000/graphql";

class AuthService {
  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          API_URL,
          {
            query: `mutation
                  {
                      login(data: { email: "${username}", password: "${password}" }) {
                          accessToken
                          user {
                              id
                              username
                              email
                          }
                      }
                  }`,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  }

  register(username: string, email: string, password: string) {
    return axios.post(
      API_URL,
      {
        query: `mutation 
        {
            login(data: { 
                $username: String!
                $email: String!
                $firstname: String!
                $lastname: String!
                $password: String!
            }) {
                accessToken
                user {
                    id
                    email
                    firstname
                    lastname
                }
            }
        }`,
        variables: {
          email: username,
          password: password,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  logout() {
    localStorage.removeItem("auth");
  }

  setCurrentUser(data: any) {
    localStorage.setItem("auth", JSON.stringify(data));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("auth") || "{}");
  }
}
var authService = new AuthService();
export default authService;
