import React from 'react';
import { selectAllUsers } from '../features/users/usersSlice';
import { useSelector } from 'react-redux';

const PostAuthor = props => {
  const users = useSelector(selectAllUsers);
  const author = users.find(user => user.id === props.userId);

  return <span>by {author ? author.name : 'UnKnown Author'}</span>;
};

export default PostAuthor;
