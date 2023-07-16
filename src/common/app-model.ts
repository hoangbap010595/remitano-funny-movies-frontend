export interface EdgesDataType {
  cursor?: string;
  node: {
    id?: string;
    title?: string;
    content?: string;
    link?: string;
    author: {
      id?: string;
      username?: string;
      email?: string;
    };
    postLikes?: Array<PostLikeDataType>;
  };
  loading: boolean;
}
export interface PostLikeDataType {
  type?: string;
}
export interface PostDataType {
  edges: Array<EdgesDataType>;
  pageInfo: {
    endCursor?: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
  };
  totalCount: number;
}

export interface RFMDataEvent {
  action: string;
  payload: any;
}

export enum RFMReactType {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
}

export enum RFMEventType {
  INIT = "INIT",
  CREATE_POST = "CREATE_POST",
  LIKE_POST = "LIKE_POST",
  DISLIKE_POST = "DISLIKE_POST",
  SHARE_VIDEO = "SHARE_VIDEO",
  NOTIFY_REACT = "NOTIFY_REACT",
  NOTIFY_COMMENT = "NOTIFY_COMMENT",
  NOTIFY_SHARE_VIDEO = "NOTIFY_SHARE_VIDEO",
  NEW_MESSAGE = "NEW_MESSAGE",
}
