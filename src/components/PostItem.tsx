// src/components/PostItem.tsx
import styled from "styled-components";
import Button from "./Button";
import type { Post } from "../types";

interface PostItemProps {
  post: Post; // 아까 만든 Post 타입을 그대로!
  // 과제 2-2: onSelect: (post: Post) => void를 추가하세요.
  onSelect: (post: Post) => void;
  onToggleFavorite: (post: Post) => void;
  isFavorite: boolean;
}
function PostItem({
  post,
  onSelect,
  onToggleFavorite,
  isFavorite,
}: PostItemProps) {
  return (
    <Card $active={isFavorite}>
      <Title>{post.title}</Title>
      <Content>{post.content}</Content>
      <ButtonWrapper>
        <Author>by {post.author}</Author>
        {/* 과제 2-2: 버튼을 누르면 현재 post를 onSelect로 넘기세요. */}
        <Button label="선택" onClick={() => onSelect(post)} />
        <FavoriteButton
          $active={isFavorite}
          onClick={() => onToggleFavorite(post)}
        >
          관심
        </FavoriteButton>
      </ButtonWrapper>
    </Card>
  );
}

const FavoriteButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "orangered" : "orange")};
  color: white;
`;

const Card = styled.div<{ $active: boolean }>`
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 12px;
  margin-bottom: 12px;
  background-color: ${({ $active }) => ($active ? "#ffd6d6" : "#ffffff")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333333;
`;

const Content = styled.p`
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #666666;
`;

const Author = styled.small`
  font-size: 12px;
  color: #999999;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export default PostItem;
