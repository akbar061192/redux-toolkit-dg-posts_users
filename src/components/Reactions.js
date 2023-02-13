import React from 'react';
import { useDispatch } from 'react-redux';
import { handleReactions } from '../features/posts/postsSlice';

const Reactions = ({ post }) => {
  const dispatch = useDispatch();

  const reactions = {
    thumpsUp: '👍',
    wow: '😮',
    heart: '❤️️',
    rocket: '🚀',
    coffee: '🍵',
  };

  const reactionButton = Object.entries(reactions).map(([name, reaction]) => {
    return (
      <button
        key={name}
        type='button'
        onClick={() => dispatch(handleReactions({ reaction: name, postId: post.id }))}
        className='reactionButton'
      >
        {reaction} {post.reactions[name]}
      </button>
    );
  });
  return <div>{reactionButton}</div>;
};

export default Reactions;
