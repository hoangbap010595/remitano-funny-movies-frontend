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
    };
  };
  loading: boolean;
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
