import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newPost, createNewPost } from '../features/posts/postsSlice';
import { selectAllUsers } from '../features/users/usersSlice';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');

  const users = useSelector(selectAllUsers);

  const dispatch = useDispatch();

  const createNewPostRecord = () => {
    if (title && body) {
      dispatch(createNewPost({ title, body, userId }));
      setTitle('');
      setBody('');
      setUserId('');
    }
  };

  const canSave = title && body && userId;

  return (
    <section>
      <h2>Add a new post</h2>
      <form>
        <label htmlFor='postTitle'>Title</label>
        <input
          type='text'
          name='postTitle'
          id='postTitle'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor='postAuthor'>Author</label>
        <select name='postAuthor' id='postAuthor' value={userId} onChange={e => setUserId(e.target.value)}>
          <option value=''></option>
          {users.map(user => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
        <label htmlFor='postContent'>Content</label>
        <textarea
          type='text'
          name='postContent'
          id='postContent'
          placeholder='Content'
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <button type='button' onClick={createNewPostRecord} disabled={!canSave}>
          Add Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
