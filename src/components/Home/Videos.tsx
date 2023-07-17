import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  List,
  Skeleton,
  Space,
  Col,
  Row,
  Typography,
} from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import {
  PostDataType,
  EdgesDataType,
  RFMReactType,
} from "../../common/app-model";
import postService from "../../services/post.service";
import appNotify from "../../common/app-notify";
import YoutubeEmbed from "../Common/YoutubeEmbed";
const { Paragraph, Text } = Typography;

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <div>
    <b>{text}</b> {React.createElement(icon)}
  </div>
);

const Videos = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PostDataType>();
  const [list, setList] = useState<EdgesDataType[]>([]);

  useEffect(() => {
    postService
      .getPublishedPosts("")
      .then((res: any) => {
        setInitLoading(false);
        setData(res.data.publishedPosts);
        setList(res.data.publishedPosts.edges);
      })
      .catch((err) => {
        console.log(err);
        appNotify.notify("Loading posts error!!!", "error");
      });
    return () => {};
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      list?.concat(
        [...new Array(5)].map(() => ({
          loading: true,
          cursor: "",
          node: {
            author: {},
          },
          postLikes: [],
        }))
      )
    );
    postService
      .getPublishedPosts(
        data?.pageInfo.hasNextPage ? data.pageInfo.endCursor || "" : ""
      )
      .then((res: any) => {
        const newPublishedPosts = res.data.publishedPosts;
        const newEdgesData = list.concat(newPublishedPosts.edges);
        setList(newEdgesData);
        setData(newPublishedPosts);
        setLoading(false);
        window.dispatchEvent(new Event("resize"));
      })
      .catch((err) => {
        appNotify.notify("Loading posts error!!!", "error");
      });
  };

  const loadMore =
    !initLoading && !loading && data?.pageInfo.hasNextPage ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>Load more...</Button>
      </div>
    ) : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="vertical"
      size="large"
      split={false}
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <Card hoverable>
              <Card.Grid className="demo-loadmore-list-video">
                <YoutubeEmbed
                  src={item.node?.link || ""}
                  title={item.node?.title || "No title"}
                />
              </Card.Grid>
              <Card.Grid
                className="demo-loadmore-list-detail"
                hoverable={false}
              >
                <Row>
                  <Col span={24}>
                    <Text
                      type="danger"
                      style={{ fontWeight: "bold", fontSize: "15px" }}
                    >
                      {item.node?.title}
                    </Text>
                    <br />
                    <Text style={{ fontWeight: "bold" }}>
                      Share by: {item.node?.author.email}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Space size={"large"}>
                      <IconText
                        icon={LikeOutlined}
                        text={
                          item.node?.postLikes
                            ?.filter((pl) => pl.type === RFMReactType.LIKE)
                            .length.toString() || "0"
                        }
                        key="list-vertical-like-o"
                      />
                      <IconText
                        icon={DislikeOutlined}
                        text={
                          item.node?.postLikes
                            ?.filter((pl) => pl.type === RFMReactType.DISLIKE)
                            .length.toString() || "0"
                        }
                        key="list-vertical-dislike-o"
                      />
                    </Space>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Text style={{}}>Description:</Text>
                    <br />
                    <Paragraph
                      ellipsis={{ rows: 4, expandable: true, symbol: "more" }}
                    >
                      {item.node.content}
                    </Paragraph>
                  </Col>
                </Row>
              </Card.Grid>
            </Card>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default Videos;
