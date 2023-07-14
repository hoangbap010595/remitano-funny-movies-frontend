import { useNavigate } from "react-router-dom";
import { Button, Layout, Typography } from "antd";
import Icon, { ShareAltOutlined, LogoutOutlined } from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { PandaSvg } from "../../common/app-icons";
import authService from "../../services/auth.service";

const { Header } = Layout;
const { Title, Text } = Typography;

const PandaIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={PandaSvg} {...props} />
);

const AppHeader = () => {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        background: "#27133a",
        color: "rgb(255, 255, 255)",
      }}
    >
      <div>
        <Title
          className="App-color-white"
          level={3}
          style={{ marginTop: "15px" }}
        >
          <PandaIcon style={{ fontSize: "32px", marginRight: "10px" }} />
          Funny Movies
        </Title>
      </div>
      <div>
        <Title
          className="App-color-white"
          level={4}
          style={{ marginTop: "15px" }}
        >
          Remitano
        </Title>
      </div>
      <div>
        <Text style={{ marginRight: "10px" }} className="App-color-white">
          Welcome {currentUser.user.email}{" "}
        </Text>
        <Button
          type="primary"
          icon={<ShareAltOutlined />}
          style={{ marginRight: "10px" }}
        >
          Share a movie
        </Button>
        <Button type="dashed" icon={<LogoutOutlined />} danger onClick={logout}>
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
