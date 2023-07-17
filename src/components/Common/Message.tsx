import { Button, Typography, Space, Col, Row } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { RFMReactType } from "../../common/app-model";
const { Text } = Typography;

const Message = ({
  payload,
  likeAction,
  dislikeAction,
}: {
  payload: any;
  likeAction: any;
  dislikeAction: any;
}) => {
  const [reactChose, setReactChose] = useState<RFMReactType>();
  console.log(payload);
  const onClickLikePost = (e: any) => {
    if (payload.postId !== "" && payload.postId !== undefined) {
      likeAction(payload.postId);
      setReactChose(RFMReactType.LIKE);
    }
  };
  const onClickDislikePost = (e: any) => {
    if (payload.postId !== "" && payload.postId !== undefined) {
      dislikeAction(payload.postId);
      setReactChose(RFMReactType.DISLIKE);
    }
  };
  return (
    <div>
      <Row>
        <Col span={24}>
          <Text type="success">A new video has been shared:</Text>
          <br />
          <Text type="danger" style={{ fontWeight: "bold", fontSize: "13px" }}>
            {payload.title}
          </Text>
          <br />
          <Text style={{ fontWeight: "bold", fontSize: "11px" }}>
            By: {payload.author}
          </Text>
        </Col>
      </Row>
      <Space size={"large"}>
        <Button
          type={reactChose === RFMReactType.LIKE ? "primary" : "ghost"}
          shape="circle"
          name="like"
          icon={<LikeOutlined />}
          onClick={onClickLikePost}
        />
        <Button
          type={reactChose === RFMReactType.DISLIKE ? "primary" : "ghost"}
          shape="circle"
          name="dislike"
          icon={<DislikeOutlined />}
          onClick={onClickDislikePost}
        />
      </Space>
    </div>
  );
};

export default Message;
