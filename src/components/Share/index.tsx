import { Link } from "react-router-dom";
import { Card, Form, Input, Button, Typography } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import BaseLayout from "../Common/BaseLayout";
import appNotify from "../../common/app-notify";
import { useState } from "react";
import { RFMEventType } from "../../common/app-model";
import { useWS } from "../../hooks/useWS";
const { Title } = Typography;

const Share = () => {
  const [form] = Form.useForm();
  const [buttonShareLoading, setButtonShareLoading] = useState<boolean>(false);

  const socket = useWS();
  const onFinish = (values: any) => {
    setButtonShareLoading(true);
    console.log("Received values of form: ", values);
    socket.emit("events", {
      action: RFMEventType.SHARE_VIDEO,
      payload: { link: values.link },
    });
    appNotify.notify("Your youtube movie is being processed!!!", "info");
    setTimeout(() => {
      form.resetFields();
      setButtonShareLoading(false);
    }, 2000);
  };
  return (
    <BaseLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          hoverable
          style={{
            width: 400,
            backgroundColor: "#f4f4f4",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <Title level={3}>Share a Youtube movie </Title>
          </div>
          <Form
            form={form}
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="link"
              label="Youtube URL"
              rules={[
                {
                  required: true,
                  message: "Please input your youtube url!",
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<LinkOutlined className="site-form-item-icon" />}
                placeholder="Enter your youtube url"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="App-button-primary"
                style={{ marginTop: "30px" }}
                block
                loading={buttonShareLoading}
              >
                Share
              </Button>
              <Form.Item
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "15px",
                }}
              >
                <Link style={{ textDecoration: "none" }} to={"/"}>
                  Back to Home
                </Link>
              </Form.Item>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </BaseLayout>
  );
};

export default Share;
