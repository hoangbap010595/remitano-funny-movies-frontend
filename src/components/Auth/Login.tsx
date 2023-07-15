import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Checkbox, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { ToastContainer, Flip } from "react-toastify";
import authService from "../../services/auth.service";
import appNotify from "../../common/app-notify";
import "react-toastify/dist/ReactToastify.min.css";
import { useState } from "react";
const { Title } = Typography;

const Login = (): JSX.Element => {
  const [buttonLoginLoading, setButtonLoginLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    setButtonLoginLoading(true);
    console.log("Received values of form: ", values);
    authService
      .login(values.email, values.password)
      .then((response: any) => {
        console.log(response);
        if (!response.data) {
          appNotify.notify(response.errors[0].message, "error");
        }
        appNotify.notify("Login successfully!", "success");
        authService.setCurrentUser(response.data.login);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        appNotify.notify("Login Error!!!", "error");
      })
      .finally(() => {
        setButtonLoginLoading(false);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url(bg-login2.jpg)",
        backgroundSize: "cover"
      }}
    >
      <Card hoverable style={{ width: 400, backgroundColor: "#f4f4f4" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Title level={2}>REMITANO </Title>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              type="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="App-button-primary"
              block
              loading={buttonLoginLoading}
            >
              Log in
            </Button>
          </Form.Item>
          <Form.Item
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            Have an Account?{" "}
            <Link style={{ textDecoration: "none" }} to={"/register"}>
              Sign Up
            </Link>
          </Form.Item>
        </Form>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </div>
  );
};
export default Login;
