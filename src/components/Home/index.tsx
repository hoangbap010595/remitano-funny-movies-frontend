import { useNavigate } from "react-router-dom";
import { Layout, Typography, theme } from "antd";
import AppHeader from "../Common/Header";
import Videos from "./Videos";

const { Header, Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <Layout style={{ padding: "24px" }}>
          <Content
            style={{
              padding: "24px 400px",
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Videos />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
