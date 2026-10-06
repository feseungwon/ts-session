import styled from "styled-components";
import PostItem from "./PostItem";
import type { Post, PostListState } from "../types";

// 과제 3-2: state: PostListState와 onSelect를 받는 Props interface를 작성하세요.
interface PostListProps {
  state: PostListState;
  onSelect: (post: Post) => void;
}

function PostList({ state, onSelect }: PostListProps) {
  // 과제 3-2: status를 확인해 로딩·실패·빈 화면을 먼저 반환하고, 성공 상태에서 PostItem 목록을 렌더링하세요.
  if (state.status === "loading") return <p>게시글을 불러오는 중입니다.</p>;
  if (state.status === "error")
    return <p>게시글을 불러오지: {state.message}</p>;
  if (state.status === "empty") return <p>아직 게시글이 없습니다.</p>;

  return (
    <List>
      {state.data.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onSelect={onSelect}
          isFavorite={false}
          onToggleFavorite={() => {}}
        />
      ))}
    </List>
  );
}

const List = styled.div`
  margin: 0;
`;

export default PostList;
