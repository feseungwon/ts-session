import { useState } from "react";
import styled from "styled-components";
import PostItem from "./components/PostItem";
import Button from "./components/Button";
import type { Post, NewPost } from "./types";

const DUMMY: Post[] = [
  { id: 1, title: "첫 글", content: "반갑습니다", author: "동건" },
  { id: 2, title: "두번째 글", content: "TS 재밌다", author: "선우" },
  { id: 3, title: "삼", content: "멋사야호", author: "근우" },
];

function App() {
  const [favorites, setFavorites] = useState<Post[]>([]);
  // 과제 1-1: DUMMY를 초기값으로 하는 게시글 상태를 만드세요. 타입 인자 Post[]를 직접 적습니다.
  const [post, setPost] = useState<Post[]>(DUMMY);

  // 과제 2-1: 선택한 게시글 상태를 Post | null 타입, 초기값 null로 만드세요.

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  function toggleFavorite(post: Post) {
    setFavorites((favorites) => {
      const exists = favorites.some((f) => f.id === post.id);

      if (exists) {
        return favorites.filter((f) => f.id !== post.id);
      } else {
        return [...favorites, post];
      }
    });
  }

  const handleAddPost = () => {
    // 과제 1-3: trim()한 입력값으로 NewPost 객체를 만들고, 하나라도 비어 있으면 추가하지 않습니다.
    const newPost: NewPost = {
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
    };

    if (!newPost.title || !newPost.content || !newPost.author) {
      return;
    }
    // 과제 1-4: NewPost에 id: Date.now()를 더해 기존 배열 뒤에 새 배열로 추가하고 입력창을 비웁니다.
    setPost((prev) => [...prev, { ...newPost, id: Date.now() }]);

    setTitle("");
    setContent("");
    setAuthor("");
  };

  return (
    <>
      <Title>🐘 TS 미니 게시판</Title>

      <input
        value={title}
        onChange={handleTitleChange}
        placeholder="제목을 입력하세요"
      />
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="내용을 입력하세요"
      />
      <input
        value={author}
        onChange={handleAuthorChange}
        placeholder="작성자를 입력하세요"
      />
      <Button label="추가" onClick={handleAddPost} />

      {/* 과제 1-1: DUMMY 대신 게시글 상태로 렌더링하세요. */}
      {/* 과제 2-2: PostItem에 onSelect를 넘기세요. */}
      {post.length === 0 ? (
        <p>아직 게시글이 없습니다.</p>
      ) : (
        <List>
          {post.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onSelect={setSelectedPost}
              isFavorite={favorites.some((f) => f.id === post.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </List>
      )}

      {/* 과제 2-3: 선택 전에는 "게시글을 선택해주세요.", 선택 후에는 번호·제목·내용·작성자를 보여 주세요. */}
      {selectedPost === null ? (
        <p>게시글을 선택해주세요.</p>
      ) : (
        <div>
          <p>번호: {selectedPost.id}</p>
          <h2>{selectedPost.title}</h2>
          <p>내용: {selectedPost.content}</p>
          <p>작성자: {selectedPost.author}</p>
        </div>
      )}
    </>
  );
}

const List = styled.div`
  margin: 0;
`;

const Title = styled.h1`
  color: #2f6feb;
  font-size: 28px;
`;

export default App;
