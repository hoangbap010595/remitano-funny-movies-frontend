import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { ToastContainer, Flip } from "react-toastify";
import authService from "../../services/auth.service";
import appNotify from "../../common/app-notify";
import "react-toastify/dist/ReactToastify.min.css";
import { useState } from "react";
const { Title } = Typography;

const Register = () => {
  const [buttonRegisterLoading, setButtonRegisterLoading] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    setButtonRegisterLoading(true);
    console.log("Received values of form: ", values);
    authService
      .register(
        values.lastname,
        values.firstname,
        values.username,
        values.email,
        values.password
      )
      .then((response: any) => {
        if (!response.data) {
          appNotify.notify(response.errors[0].message, "error");
        }
        appNotify.notify("Register successfully!", "success");
        authService.setCurrentUser(response.data.signup);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        appNotify.notify("Register Error!!!", "error");
      })
      .finally(() => {
        setButtonRegisterLoading(false);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url(bg-login.jpg)",
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
          <Title level={2}>REMITANO</Title>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item style={{ marginBottom: 0 }}>
            <Form.Item
              name="firstname"
              rules={[{ required: true, message: "Fristname is not empty!" }]}
              style={{ display: "inline-block", width: "calc(50% - 8px)" }}
              hasFeedback
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Firstname"
              />
            </Form.Item>
            <Form.Item
              name="lastname"
              rules={[{ required: true, message: "Lastname is not empty!" }]}
              style={{
                display: "inline-block",
                width: "calc(50% - 2px)",
                marginLeft: "10px",
              }}
              hasFeedback
            >
              <Input placeholder="Lastname" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter you username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
            hasFeedback
          >
            <Input
              type="email"
              prefix={<MailOutlined className="site-form-item-icon" />}
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
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              id="password"
              placeholder="Enter your Password"
            />
          </Form.Item>
          <Form.Item
            name="cpassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              id="cpassword"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              name="register"
              htmlType="submit"
              className="App-button-primary"
              block
              loading={buttonRegisterLoading}
            >
              Register
            </Button>
          </Form.Item>
          <Form.Item
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            Already have an account?{" "}
            <Link style={{ textDecoration: "none" }} to={"/login"}>
              Log In
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

export default Register;
