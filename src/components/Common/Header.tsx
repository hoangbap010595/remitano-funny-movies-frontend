import { useNavigate } from "react-router-dom";
import { Button, Layout, Typography, Space } from "antd";
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
  const goToShare = () => {
    navigate("/share");
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
      <Space>
        <PandaIcon style={{ fontSize: "36px", marginTop: "12px" }} />
        <Title
          className="App-color-white"
          level={1}
          style={{ marginTop: "5px" }}
        >
          Funny Movies
        </Title>
      </Space>
      <div>
        <Title
          className="App-color-white"
          level={4}
          style={{ marginTop: "15px" }}
        >
          {/* Remitano */}
        </Title>
      </div>
      <Space size={"small"}>
        <Text className="App-color-white">
          Welcome <b>{currentUser.user.email} </b>
        </Text>
        <Button
          type="primary"
          icon={<ShareAltOutlined />}
          style={{
            backgroundColor: "rgb(155, 89, 182)",
            borderColor: "rgb(155, 89, 182)",
          }}
          onClick={goToShare}
        >
          Share a movie
        </Button>
        <Button type="dashed" icon={<LogoutOutlined />} danger onClick={logout}>
          Logout
        </Button>
      </Space>
    </Header>
  );
};

export default AppHeader;
