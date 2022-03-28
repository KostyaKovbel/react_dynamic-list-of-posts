/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getData } from './api/posts';
import { Post } from './types/Post';
import { getUsers } from './api/users';
import { User } from './types/User';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [postId, setPostId] = useState<number>(0);
  const [postToOpen, setPostToOpen] = useState<Post>();
  const [postsToDisplay, setPostsToDisplay] = useState<Post[]>();

  useEffect(() => {
    getData('posts')
      .then(response => setPosts(response));
  }, []);

  useEffect(() => {
    getUsers()
      .then(response => setUsers(response.filter((user: User) => posts
        .some(post => post.userId === user.id))))
      .then(() => {
        setPostsToDisplay(posts);
      });
  }, [posts]);

  const openPost = (id: number) => {
    setPostId(id);
  };

  useEffect(() => {
    const post = posts?.find(el => el.id === postId);

    setPostToOpen(post);
  }, [postId]);

  const handlePostsDisplay = (name: string) => {
    return name === 'All' ? setPostsToDisplay([...posts]) : setPostsToDisplay([...posts].filter(post => post.userId === users.find(user => user.name === name)?.id));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => {
              handlePostsDisplay(event.target.value);
            }}
          >
            <option
              value="All"
            >
              All
            </option>
            {users.map(el => (
              <option
                value={el.name}
                key={el.id}
              >
                {el.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={postsToDisplay}
            users={users}
            openPost={openPost}
            postId={postId}
          />
        </div>

        <div className="App__content">
          {postToOpen && (
            <PostDetails post={postToOpen} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
