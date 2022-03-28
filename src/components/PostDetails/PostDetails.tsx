/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { getComments } from '../../api/coments';
import { Post } from '../../types/Post';
import { NewCommentForm } from '../NewCommentForm';
import { Comment } from '../../types/Comment';
import './PostDetails.scss';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>();
  const [isCommentsVisible, setIsCommentsVisible] = useState<boolean>(true);

  useEffect(() => {
    getComments(post.id)
      .then(response => {
        const filtredComments: Comment[] = response
          .filter((comment: Comment) => comment.postId === post.id);

        setComments(filtredComments);
      });
  }, [post]);

  const handleVisibility = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      {comments && comments.length > 0 ? (
        <section className="PostDetails__comments">
          {isCommentsVisible ? (
            <button
              type="button"
              className="button"
              onClick={handleVisibility}
            >
              {comments.length > 1 ? (
                `hide ${comments.length} comments`
              ) : (
                'hide 1 comment'
              )}
            </button>
          ) : (
            <button
              type="button"
              className="button"
              onClick={handleVisibility}
            >
              {comments.length > 1 ? (
                `show ${comments.length} comments`
              ) : (
                'show 1 comment'
              )}
            </button>
          )}

          {isCommentsVisible && (
            <ul className="PostDetails__list">
              {comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                  >
                    X
                  </button>
                  <p>
                    <span className="PostDetails__username">
                      {comment.name ? (comment.name) : (['Anonimous'])}
                      {': '}
                    </span>
                    {comment.body}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : (
        <p className="PostDetails__commentsCall">
          No one comment it before... so sad... BUT! YOU ARE THE Chosen ONE!!!! Be first :)
        </p>
      ) }

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
};
