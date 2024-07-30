// src/App.tsx
import React, { useState, useEffect, useMemo, useCallback, FC } from 'react';
import PostsList from './components/PostsList';
import './App.css';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const App: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<string>('ALL');
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  const uniqueUsers = useMemo(() => {
    const users = posts.map(post => post.userId);
    return ['ALL', ...Array.from(new Set(users.map(String)))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (filter === 'ALL') return posts;
    return posts.filter(post => post.userId === parseInt(filter));
  }, [posts, filter]);

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  }, []);

  return (
    <div className="container">
      <h1>Posts</h1>
      <div>
        <label htmlFor="userFilter">User Filter: </label>
        <select id="userFilter" value={filter} onChange={handleFilterChange}>
          {uniqueUsers.map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </div>
      <div className="table-container">
        <PostsList posts={filteredPosts} />
      </div>
    </div>
  );
};

export default App;
