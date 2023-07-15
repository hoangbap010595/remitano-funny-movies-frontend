import { Layout, theme } from "antd";
import { ToastContainer, Flip } from "react-toastify";
import AppHeader from "./Header";
import { useContext, useEffect } from "react";
import { WebSocketContext } from "../../hooks/WSContext";
import appNotify from "../../common/app-notify";
import {
  RFMDataEvent,
  RFMEventType,
  RFMReactType,
} from "../../common/app-model";
import authService from "../../services/auth.service";
import Message from "./Message";

const { Content } = Layout;

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const currentUser = authService.getCurrentUser();
  const socket = useContext(WebSocketContext);

  const likeAction = (postId: string) => {
    console.log("likeAction: ", postId);
    socket.emit("events", {
      action: RFMEventType.LIKE_POST,
      payload: { postId: postId, type: RFMReactType.LIKE },
    });
  };
  const dislikeAction = (postId: string) => {
    console.log("dislikeAction", postId);
    socket.emit("events", {
      action: RFMEventType.DISLIKE_POST,
      payload: { postId: postId, type: RFMReactType.DISLIKE },
    });
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
      socket.emit("events", {
        action: RFMEventType.INIT,
        payload: { token: currentUser.accessToken },
      });
    });
    socket.on("onMessage", (message: RFMDataEvent) => {
      console.log("onMessage event received!");
      console.log(message);
      const payload = message.payload;
      switch (message.action) {
        case RFMEventType.NOTIFY_SHARE_VIDEO:
          if (currentUser.user.email === payload.author) {
            appNotify.notify(
              `Your movie "${payload.title}" has been shared!!!`,
              "success"
            );
          } else {
          }
          appNotify.notifyCustom(
            <Message
              payload={payload}
              likeAction={likeAction}
              dislikeAction={dislikeAction}
            />
          );
          break;
        case RFMEventType.INIT:
          appNotify.notify(payload.message, "success");
          break;
        default:
          appNotify.notify(message.action, "success");
          break;
      }
    });

    return () => {
      console.log("Unregistering Events!");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, [socket, currentUser]);

  return (
    <>
      <Layout>
        <AppHeader />
        <Layout>
          <Layout style={{ padding: "24px" }}>
            <Content
              style={{
                padding: "24px",
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={10}
        transition={Flip}
      />
    </>
  );
};

export default BaseLayout;
