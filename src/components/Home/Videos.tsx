import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton, Space } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { PostDataType, EdgesDataType } from "../../common/app-model";
import postService from "../../services/post.service";
import appNotify from "../../common/app-notify";
import { toast } from "react-toastify";

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
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
        console.log(res);
        setInitLoading(false);
        setData(res.data.publishedPosts);
        setList(res.data.publishedPosts.edges);
      })
      .catch((err) => {
        console.log(err);
        appNotify.notifyError("Loading posts error!!!");
      });
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
        }))
      )
    );
    postService
      .getPublishedPosts(
        data?.pageInfo.hasNextPage ? data.pageInfo.endCursor || "" : ""
      )
      .then((res: any) => {
        console.log(res);
        const newPublishedPosts = res.data.publishedPosts;
        const newEdgesData = list.concat(newPublishedPosts.edges);
        setList(newEdgesData);
        setData(newPublishedPosts);
        setLoading(false);
        window.dispatchEvent(new Event("resize"));
      })
      .catch((err) => {
        appNotify.notifyError("Loading posts error!!!");
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
        <Button onClick={onLoadMore}>Loading more...</Button>
      </div>
    ) : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="vertical"
      size="large"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item
              key={item.node.id}
              actions={[
                <IconText
                  icon={LikeOutlined}
                  text="156"
                  key="list-vertical-like-o"
                />,
                <IconText
                  icon={DislikeOutlined}
                  text="2"
                  key="list-vertical-dislike-o"
                />,
              ]}
              style={{}}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
              
            >
              <List.Item.Meta
              prefixCls="aaaaa"
                title={<a href={item.node.link}>{item.node?.title}</a>}
                description={item.node.content}
                children={(<div>aaaa</div>)}
              />
              {item.node.content}
            </List.Item>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default Videos;
