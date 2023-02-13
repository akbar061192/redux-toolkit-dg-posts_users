import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from '../features/posts/postsSlice';
import { fetchUsers } from '../features/users/usersSlice';
import PostAuthor from './PostAuthor';
import Reactions from './Reactions';
import Timeago from './Timeago';

const Posts = () => {
  const posts = useSelector(selectAllPosts);
  const status = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, []);

  const sortedPosts = [...posts].sort((a, b) => {
    return b.date.localeCompare(a.date);
  });

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {sortedPosts.map(post => {
        return (
          <article key={Math.random()}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p className='postCredit'>
              <PostAuthor userId={post.id} />
              <Timeago timeStamp={post.date} />
            </p>
            <Reactions post={post} />
          </article>
        );
      })}
    </section>
  );
};

export default Posts;
