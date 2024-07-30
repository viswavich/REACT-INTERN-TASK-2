// src/components/PostsList.tsx
import React, { FC } from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostsListProps {
  posts: Post[];
}

const PostsList: FC<PostsListProps> = ({ posts }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>User Id</th>
          <th>Post Id</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post => (
          <tr key={post.id}>
            <td>{post.userId}</td>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostsList;
