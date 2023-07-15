import axios from "axios";

const { REACT_APP_API_URL } = process.env;
const APP_API = REACT_APP_API_URL || "";
class AuthService {
  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          APP_API || "",
          {
            query: `mutation
                  {
                      login(data: { email: "${username}", password: "${password}" }) {
                          accessToken
                          user {
                            id
                            username
                            email
                            firstname
                            lastname
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

  register(
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string
  ) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          APP_API,
          {
            query: `mutation 
            {
                signup(data: { 
                    username: "${username}"
                    email: "${email}"
                    firstname: "${firstname}"
                    lastname: "${lastname}"
                    password: "${password}"
                }) {
                    accessToken
                    user {
                        id
                        username
                        email
                        firstname
                        lastname
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
