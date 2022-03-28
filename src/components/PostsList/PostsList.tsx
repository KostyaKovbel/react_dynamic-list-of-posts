import React from 'react';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import './PostsList.scss';

type Props = {
  posts: Post[] | undefined,
  users: User[] | undefined,
  openPost: (id: number) => void,
  postId: number,
};

export const PostsList: React.FC<Props> = ({
  posts,
  users,
  openPost,
  postId,
}) => (
  <div className="PostsList">
    <h2>Posts:</h2>
    <ul>
      {posts?.map(post => (
        <li
          key={post.id}
          className="PostsList__item"
        >
          <div>
            <b>
              [
              {users?.find(user => user.id === post.userId)?.name || 'Anonimous'}
              ]:
              {' '}
            </b>
            {post.title}
          </div>
          {postId !== post.id ? (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                openPost(post.id);
              }}
            >
              Open
            </button>

          ) : (
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                openPost(0);
              }}
            >
              Close
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);
