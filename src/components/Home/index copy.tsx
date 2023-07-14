import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const Home = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };


  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: 50,
          paddingRight: 50,
          paddingTop: 10,
        }}
      >
        <div>
          <h3 className="m-3">Funny Movies</h3>
        </div>
        <div>
          <Button type="dashed" danger onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center text-center"
          style={{ height: "100vh" }}
        >
          <p className="muted display-6">Hello User👋</p>
        </div>
      </div>
    </>
  );
};

export default Home;
